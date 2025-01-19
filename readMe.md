# Simple MES System

Hi, this is a project on simple MES system with 3 pages, showing 3 modules:

- Dasboard
- Production Tracking
- Quality Control

## Dashboard Page

In this page, the function is to monitor 3 item:

- average machine utilization
- production distribution based on production status
- average defect rate

For **Machine Utilization** , it is calculated by the average of machine utilization from a sample data in backend. This is assuming that the data is populated on the factory side.

For **Production Distribution** , it is showing the total production, and their distribution based on status

For **Defect Rate** , it is calculated by the average of defect rate of completed inspection.

## Production Tracking Page

The page shows a list of productions with various statuses. User can click into any of the list, and will be navigated to the detail page. User can also add new production.
In the detail page, user can update or delete the production details.

## Quality Control Page

The page shows a list of inspection with various statuses. User can click into any of the list, and will be navigated to the detail page. User can also schedule new inspection.
In the detail page, user can update or delete the inspection details.
