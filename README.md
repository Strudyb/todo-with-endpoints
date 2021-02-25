## Available Scripts

This project built using without 3rd packages and tools except axios. Due to project size, component drilling preferred. The purpose of the project, fetching data from the fake API, merging the related todos and users and getting the datas to the table. In the table component, you can sort, edit and delete the related datas. Available Components are:

*Header
*Loader
*Modal
*Pagination
*Table component. All of the components were built custom

Folder Structure:
-src
--components
---Header
---Loader
---Modal
---Pagination
---Table
--scss
---_header
---_modal
---_pagination
---_table
---_utilities
---App (all parts imported to the app)

    .
    ├── build                   # Compiled files (alternatively `dist`)
    ├── docs                    # Documentation files (alternatively `doc`)
    ├── src                     # Source files (alternatively `lib` or `app`)
    ├── test                    # Automated tests (alternatively `spec` or `tests`)
    ├── tools                   # Tools and utilities
    ├── LICENSE
    └── README.md
