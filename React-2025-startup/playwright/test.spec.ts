import { test, expect } from '@playwright/test';

test('localhost - test', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // await page.getByRole('link', {name: 'Test'}).click();
  await page.getByTestId('test-nav').click();

  await expect(page.getByRole('heading', { name: 'Test - From' })).toBeVisible();

  // await page.getByRole('button').click();
  await page.locator('button[type="submit"]').click();

  const ariaLive = await page.getByText('Name is required').getAttribute('aria-live');
  expect(ariaLive).toBe('polite');

  await page.locator('button[type="reset"]').click();
  await expect(page.getByText('heading', { name: 'Name is required' })).toBeHidden();

  await page.getByLabel('Name').fill('Kiet Ve Tran');
  await page.locator('button[type="submit"]').click();
  await expect(page.getByText('heading', { name: 'Name is required' })).toBeHidden();

  // Locate the modal (only test this section of the DOM)
  // const form = page.locator('form.form-wrapper');

  // Grab its HTML
  // const html = await form.evaluate((el) => el.outerHTML);

  // Run axe on that snippet
  // const results = await axe(html);

  // Assert no a11y violations - Hvhs label for input mangler, ville jest-axe rapportere et UU-brudd
  // expect(results).toHaveNoViolations();

  /*
  const ariaLive = await page.getByText('Name is required').getAttribute('aria-live');
  console.log('== HER ==');
  console.log(ariaLive);

  expect( ariaLive ).toContainText('polite');
  */

  // await page.locator('#home-nav').click();

  /*
  await page.getByLabel('User Name').fill('John');

  await page.getByLabel('Password').fill('secret-password');

  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page.getByText('Welcome, John!')).toBeVisible();

  await locator.hover();
  await locator.click();
  */
});
