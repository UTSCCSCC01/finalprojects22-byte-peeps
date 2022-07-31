## Styling

- `App.css` styles:
  - `center` class - puts the content in the middle which uses display flex with column direction.
  - `rowCenter` class - same as above but display flex with row direction.
  - `fullDimension` class - make the div have full height and width.
  - `page` class - has the styling applied for each page.
  - `tabPanel` class - has the styling for each tab panel. This is used for settings page.
  - `tabPanelContainer` - div container for the tabPanel. This is used for settings page.
  - `tabPage` - styling for pages that tabs to display subpages

## Custom Hooks

- Use Notification

  - Used to provide a simple interface that can be passed to the `Notification` component, then manipulated using setters that change the notification state

- Use Comments Table

  - Used by the Comments Table to maintain states including paging and querying data

## Generic Components

- Authenticated check:

  - `IsSignedIn.tsx` To display a component only when the user is authenticated
  - Example: `Header.tsx`

- Active API check:

  - `InactiveApiChecker.tsx` is used globally to display user alerts indicating that one of the setup APIs has expired and needs to be refreshed

- Cards:

  - `CardInfo.ts`: cards that display a metric.
  - `CardChart.ts`: cards that act a wrapper for charts, tables, etc.
  - `CardGenerator.ts`: generates many `CardInfo` components in a row.
  - `CardHeader.ts`: makes the query to call `CardGenerator` which are the cards at the top of each page (platform dependent).

- Date Selector:

  - `dateSelector.tsx` `dateSelectorSlice.ts`.
  - Uses redux to share the current date range selector.
  - Shares the date in format `yyyymmdd`.
  - Helper functions present in the `dateSelectorSlice.ts` file
    - `createDate`: returns date obj from that format.
    - `formatDate`: fromats a date obj to that format.

- Metrics Table

  - `MetricsTable.tsx`
  - Contains default configuration for displaying consistent tables with server side paging

- Comments Table

  - `CommentsTable.tsx`: the actual component, utilizes the metrics table and the `useCommentsTable` custom hook to display comments for social media platforms

-Time Series Table

- `GeneralTimeSeriesChart.tsx`: the actual component, utilizes the time series chart and the `useTimeSeriesTable` custom hook to display sentiment analysis across a period of time for social media platforms

- Notification component:

  - `Notification.tsx`
  - Contains default configuration for displaying consistent notifications that can be easily used with the `useNotification` hook

- Loading:

  - `Loader.tsx`: has a centered and fullDimesion circular progress icon from react mui
  - Example: `CardInfo.tsx`

- ErrorMessage:

  - `ErrorMessage.tsx`
  - Exmaple: `CardInfo.tsx`

- NoData:
  - `NoData.tsx`: displays a message if we have no data for that date range
  - Example: `CardInfo.tsx`

## Global State Management

- Redux

## Authentication

- We use session authentication to authenticate the user
- Therefore, we only allow one user to be logged in from one browser at time
- If two users which to be logged in from the same browsers, then two different browsers must be used
- `AuthChecker.tsx` adds on an event listener to the localStorage to see if another user attempts to sign in, if so any tabs that previously were signed in are signed out

## Making async backend calls

- Initially we used `Async Thunks` from the redux tool kit, however we realized how verbose they are and how much more code we will have to write in comparison to a library like `ReduxToolKit Query` and `React Query`.
- As a group we decided to switch to `React Query` to reduce the amount of boiler plate code.
- Refactoring the code that uses `Async Thunks` is left as a future todo/issue outside the scope of this project.
- Other benefits of useQuery() that come with it:
  - re-fetching
  - retry
  - caching
  - debouncing

## Helper functions

- `extractBackendError`: Extracting backend error messages from the standard backend format

## Formatting

- We are using the `Alt + shift + o` command in VSCode to order import statements
