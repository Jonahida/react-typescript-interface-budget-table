# Budget Table using TypeScript & React

This project demonstrates how to create a budget table using TypeScript and React, utilizing interface props in functional components.

The project use as starting point the steps shared by [Pluralsight](https://www.pluralsight.com/resources/blog/guides/use-interface-props-in-functional-components-using-typescript-with-react). Its project that can be found here in [GitHub](https://github.com/deekshasharma/interface-props-react-typescript.git)

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Code Overview](#code-overview)
  - [App Component](#app-component)
  - [BudgetOverview and BudgetItem Components](#budgetoverview-and-budgetitem-components)
  - [Interfaces](#interfaces)
- [Changes from original project](#changes-from-original-project)


## Installation

To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/deekshasharma/interface-props-react-typescript.git
cd interface-props-react-typescript
npm install
```

## Usage
To run the project, use the following command:
```bash
npm start
```

This will start the development server and open the application in your default browser.

## Code Overview

### `App` Component
The `App` component initializes the budget data and renders the `BudgetOverview` component.

```tsx
import React from 'react';
import './App.css';
import { BudgetOverview } from "./BudgetOverview";

const homeBudgets = [
    {
        budgeted: 500,
        spent: 200,
        category: "Food",
    },
    {
        budgeted: 1000,
        spent: 1500,
        category: "Utilities",
    }
]

function App() {
    return (
        <div className="App">
            <header className="App-header">Budget Table using TypeScript & React</header>
            <BudgetOverview budgets={homeBudgets} />
        </div>
    );
}
```

### `BudgetOverview` and `Budgetitem` components
The BudgetOverview component receives a list of budgets as props and renders a table with the budget data.

```tsx
import React from "react";
import Budget from "./interfaces";

interface BudgetProps {
    budgets: Budget[];
}

export const BudgetOverview: React.FC<BudgetProps> = ({ budgets }: BudgetProps) => {
    return <div className="Budget-Overview">
        <table>
            <tbody>
                <tr className="Table-Header">
                    <td>
                        <h4>CATEGORY</h4>
                    </td>
                    <td>
                        <h4>BUDGETED</h4>
                    </td>
                    <td>
                        <h4>SPENT</h4>
                    </td>
                    <td>
                        <h4>REMAINING</h4>
                    </td>
                </tr>
                {budgets.map((item, index) => (
                    <BudgetItem 
                        key={index}
                        budgeted={item.budgeted}
                        spent={item.spent}
                        category={item.category} 
                    />
                ))}
            </tbody>
        </table>
    </div>
}

interface BudgetItemProps {
    budgeted: number;
    spent: number;
    category: string;
}

const BudgetItem: React.FC<BudgetItemProps> = ({ category, budgeted, spent }) => {
    const remainingAmount: number = budgeted - spent;
    return <tr>
        <td>
            <h5>{category}</h5>
        </td>
        <td>
            <h5>{"$" + budgeted}</h5>
        </td>
        <td>
            <h5>{"$" + spent}</h5>
        </td>
        <td>
            <h5 style={{color: remainingAmount >= 0 ? 'green' : 'red' }}>{"$" + remainingAmount}</h5>
        </td>
    </tr>
}
```

### Interfaces
The `interfaces.ts` file defines the `Budget` interface, which is used throughout the application to ensure type safety.

```tsx
interface Budget {
    category: string;
    budgeted: number;
    spent: number;
}

export default Budget;
```

### Changes from original project
This project builds upon the code provided in the original repository. Key changes include:

1. Original project run using `yarn` and this one is using `npm`. In terms of functionality, both **Yarn** and **npm** achieve the same goal of managing project dependencies and scripts. However, there are differences in their implementation, features, and commands.

2. Self-closing BudgetItem Tag: Ensured BudgetItem is used as a self-closing tag to prevent unintended children prop being passed.

#### Original:
```tsx
{budgets.map(item => {
    return <BudgetItem budgeted={item.budgeted}
                       spent={item.spent}
                       category={item.category}>
    </BudgetItem>
})}
```
#### Modified:
```tsx
Copy code
{budgets.map((item, index) => (
    <BudgetItem 
        key={index}
        budgeted={item.budgeted}
        spent={item.spent}
        category={item.category} 
    />
))}
```

3. Explicit Props Definition for BudgetItem: Introduced a separate BudgetItemProps interface for BudgetItem props.

#### Original:
```tsx
Copy code
const BudgetItem: React.FC<Budget> = ({ category, budgeted, spent }: Budget) => { ... }
```

#### Modified:
```tsx
interface BudgetItemProps {
    budgeted: number;
    spent: number;
    category: string;
}

const BudgetItem: React.FC<BudgetItemProps> = ({ category, budgeted, spent }) => { ... }
```

4. This project displays negative values in red instead of forcing negative values to 0.


#### Original:
```tsx
...
const BudgetItem: React.FC<BudgetItemProps> = ({ category, budgeted, spent }) => {
    const remainingAmount: number = (budgeted - spent) > 0 ? (budgeted - spent) : 0;
    return <tr>
        <td>
            <h5>{category}</h5>
        </td>
        <td>
            <h5>{"$" + budgeted}</h5>
        </td>
        <td>
            <h5>{"$" + spent}</h5>
        </td>
        <td>
            <h5>{"$" + remainingAmount}</h5>
        </td>
    </tr>
}
```

#### Modified:
```tsx
...
const BudgetItem: React.FC<BudgetItemProps> = ({ category, budgeted, spent }) => {
    const remainingAmount: number = budgeted - spent;
    return <tr>
        <td>
            <h5>{category}</h5>
        </td>
        <td>
            <h5>{"$" + budgeted}</h5>
        </td>
        <td>
            <h5>{"$" + spent}</h5>
        </td>
        <td>
            <h5 style={{color: remainingAmount >= 0 ? 'green' : 'red' }}>{"$" + remainingAmount}</h5>
        </td>
    </tr>
}
```

These changes ensure type safety and code clarity, following best practices for using TypeScript with React.
