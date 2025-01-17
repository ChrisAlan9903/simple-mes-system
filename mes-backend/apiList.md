# List of API needed

### DASHBOARD

- (GET) /production-status-statistic

  - data for the production status pie chart that shows the percentage of each production by status
  - statuses : Planned, In Progress, Completed, Cancelled
  - expected body in the form of:
    - [{name: Planned, value: 20},{name: In Progress, value: 20} ...]

- (GET) /machine-utilization

  - data for the machine utilization card.
  - expected body in the form of:
    - {machineUtilization: 50} (value in percentage)

- (GET) /defect-rate
  - data for the defect rates card.
  - expected body in the form of:
    - {
      quantityInspected: 50,
      defectCount: 5
      }
