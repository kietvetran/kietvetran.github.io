import * as Yup from "yup";

// const testSchema = Yup.object().shape({
//   name: Yup.string().trim().min(3).max(20).required(),
//   age: Yup.number().positive().integer()
// });

const fields = [
  {
    name: "username",
    type: "text",
    label: "Username",
    placeholder: "Username",
    validations: ["string", "strict", "trim", "min", "max", "required"],
    params: {
      min: 3,
      max: 20,
      required: "Username is required"
    }
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Email",
    validations: ["string", "email", "trim", "required"],
    params: {
      required: "Email is required"
    }
  },
  {
    name: "isBig",
    type: "checkbox",
    label: "Is Big",
    validations: ["boolean"],
    params: {}
  },
  {
    name: "count",
    type: "number",
    label: "Count",
    validations: ["number", "when"],
    params: {
      when: [
        "isBig",
        {
          is: true,
          then: {
            min: 5
          },
          otherwise: {
            min: 0
          }
        }
      ]
    }
  }
];

const createValidationSchema = (fields = []) => {
  const ObjectSchema = fields.reduce((schema, field) => {
    if (field?.validations?.length) {
      schema[field.name] = field.validations.reduce(
        (yup, type) => {
          if (field.params[type]) {
            const params = Array.isArray(field.params[type])
              ? field.params[type]
              : [field.params[type]];

            yup = yup[type](...params);
          } else {
            yup = yup[type]();
          }

          return yup;
        },
        { ...Yup }
      );
    }

    return schema;
  }, {});

  return Yup.object().shape({ ...ObjectSchema });
};

const schema = createValidationSchema(fields);

console.log(schema);

schema
  .validate({
    username: "john_doe",
    email: "john.doe@example.com"
  })
  .then((result) => {
    console.log({ result });
  })
  .catch((error) => {
    console.log({ error });
  });
