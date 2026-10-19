const sampleOrders = [
  { id: 'ORD-1001', customer: 'Arun Kumar', email: 'arun@example.com', amount: 2500, status: 'Completed', date: '2026-10-18', items: 3 },
  { id: 'ORD-1002', customer: 'Priya Sharma', email: 'priya@example.com', amount: 1800, status: 'Pending', date: '2026-10-17', items: 2 },
  { id: 'ORD-1003', customer: 'Karthik Raj', email: 'karthik@example.com', amount: 4200, status: 'Completed', date: '2026-10-16', items: 5 },
  { id: 'ORD-1004', customer: 'Divya S', email: 'divya@example.com', amount: 1200, status: 'Cancelled', date: '2026-10-15', items: 1 },
  { id: 'ORD-1005', customer: 'Vijay Kumar', email: 'vijay@example.com', amount: 3500, status: 'Pending', date: '2026-10-14', items: 4 },
  { id: 'ORD-1006', customer: 'Meena Raj', email: 'meena@example.com', amount: 2750, status: 'Processing', date: '2026-10-12', items: 2 },
  { id: 'ORD-1007', customer: 'Sanjay Kumar', email: 'sanjay@example.com', amount: 6900, status: 'Completed', date: '2026-10-10', items: 6 },
  { id: 'ORD-1008', customer: 'Nithya S', email: 'nithya@example.com', amount: 950, status: 'Pending', date: '2026-10-08', items: 1 },
  { id: 'ORD-1009', customer: 'Rahul Dev', email: 'rahul@example.com', amount: 5100, status: 'Processing', date: '2026-10-05', items: 3 },
  { id: 'ORD-1010', customer: 'Aishwarya M', email: 'aishwarya@example.com', amount: 3200, status: 'Completed', date: '2026-10-01', items: 2 }
];

export async function getOrders({ startDate = '', endDate = '' } = {}) {
  // Simulate the delay of a real API request.
  await new Promise((resolve) => setTimeout(resolve, 450));

  return sampleOrders
    .filter((order) => {
      const matchesStartDate = !startDate || order.date >= startDate;
      const matchesEndDate = !endDate || order.date <= endDate;

      return matchesStartDate && matchesEndDate;
    })
    .map((order) => ({ ...order }));
}