import { expect, test } from '@playwright/test'
test.describe('Orders page', () => {
  test('search and change a status', async ({ page }) => {
    await page.goto('/orders')
    const ordersTable = page.getByRole('table')
    await expect(ordersTable).toBeVisible()
    // 1 header row + 8 sample orders
    await expect(page.getByRole('row')).toHaveCount(9)
    await expect(page.getByTestId('pendingCount')).toHaveText('3')
    // search for one customer, other rows must disappear
    await page.getByLabel('Search orders').fill('Priya')
    await expect(ordersTable.getByText('Priya Sharma')).toBeVisible()
    await expect(ordersTable.getByText('Arun Kumar')).toHaveCount(0)
    await expect(page.getByRole('row')).toHaveCount(2)
    // change the status and check the dropdown and the pending count
    const statusSelect = page.getByLabel('Status for ORD-1001')
    await statusSelect.selectOption('Completed')
    await expect(statusSelect).toHaveValue('Completed')
    await expect(page.getByTestId('pendingCount')).toHaveText('2')
  })
  test('shows a message when nothing matches', async ({ page }) => {
    await page.goto('/orders')
    await page.getByLabel('Search orders').fill('zzz-no-match')
    await expect(page.getByTestId('noResults')).toHaveText('No orders match your search.')
    await expect(page.getByRole('table')).toHaveCount(0)
  })
  test('home page links to the orders page', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Order Management Portal' })).toBeVisible()
    await expect(page.getByTestId('apiBaseUrl')).toHaveText('http://localhost:3000/api')
    await page.getByRole('link', { name: 'Go to Orders' }).click()
    await expect(page).toHaveURL(/\/orders$/)
    await expect(page.getByRole('heading', { name: 'Orders' })).toBeVisible()
  })
})
