id := 
sb1_form_field_post_number

range :=
11

name := 
Postnummerfelt

approved :=

tag :=
input
postnummer
tall
adresse

teaser :=
<i class="sb1_lib_field_post_number"></i>

detail :=
-d_s 
name := 
Hvordan bruke

description :=

-d_e
-d_s
name :=
Demo

iframe :=
{PATH}/index.html
-d_e
-d_s
name :=
HTML-kode

code :=
<input type="tel" name="postnumber" spellcheck="false" autocomplete="off" data-rule="postnumber digit[4]" maxlength="4">
-d_e

-d_s
name :=
CSS-kode

code :=
input[type="tel"]:focus {
  border-color: #008ed2;
}
 
input[type="tel"] {
  border: 2px solid #d8d8d8;
  line-height: 36px;
  color: #008ed2;
  font-size: 17px;
  border-radius: 4px;
  padding: 0 10px;
}
 
input[type="tel"].large {
  line-height: 56px;
  font-size: 26px;
}
-d_e

directory_depending :=
src/fonts
src/bootstrap

less_import :=
../bootstrap/less/variables.less
../bootstrap/less/mixins.less
../bootstrap/less/normalize.less

less_depending :=
src/less/common/variables.less
src/less/mixins/fontface.less
src/less/common/typography.less
src/less/common/form.less
src/less/common/sb1_form_validation.less

js_depending :=
src/js/jquery/1.8.3.jquery.js
src/js/plugins/sb1_form_validation.js
