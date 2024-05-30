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
import React, { useEffect, useState } from 'react';
import './App.css';
import { BudgetOverview } from './BudgetOverview';

function App() {
    // Initialize state variable to hold budget data
    const [budgetData, setBudgetData] = useState([]);

    // Fetch budget data from JSON file when component mounts
    useEffect(() => {
        // Fetch budget data from JSON file
        fetch('./budgetdata.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch budget data');
                }
                return response.json(); // Parse JSON response
            })
            .then(data => setBudgetData(data)) // Update state with fetched data
            .catch(error => console.error('Error fetching budget data:', error)); // Log error if fetching fails
    }, []); // Empty dependency array ensures effect runs only once after component mounts

    return (
        <div className="App">
            {/* Header */}
            <header className="App-header">Budget Table using TypeScript & React</header>
            
            {/* Render BudgetOverview component with fetched budget data */}
            <BudgetOverview budgets={budgetData} />
        </div>
    );
}

export default App;
```

### `BudgetOverview` and `Budgetitem` components
The BudgetOverview component receives a list of budgets as props and renders a table with the budget data.

```tsx
import React from "react";
import Budget from "./interfaces";

interface BudgetProps {
    budgets: Budget[];
}

export const BudgetOverview: React.FC<BudgetProps> = ({budgets}: BudgetProps) => {
    return <div className="Budget-Overview">
        <table>
            <tbody>
            <tr className="Table-Header">
                <td>
                    <h4>ID</h4>
                </td>
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
            {budgets.map(item => (
                <BudgetItem 
                    id={item.id}
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
    id: number;
    budgeted: number;
    spent: number;
    category: string;
}

const BudgetItem: React.FC<BudgetItemProps> = ({id, category, budgeted, spent}) => {
    const remainingAmount: number = budgeted - spent;
    return <tr>
        <td>
            <h5>{id}</h5>
        </td>
        <td>
            <h5>{category}</h5>
        </td>
        <td>
            <h5>{"$ " + budgeted}</h5>
        </td>
        <td>
            <h5>{"$ " + spent}</h5>
        </td>
        <td>
            <h5 style={{color: remainingAmount >= 0 ? 'green' : 'red' }}>$ {(remainingAmount < 0) ? Math.abs(remainingAmount) : remainingAmount}</h5>
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

### Go to the first commit to track changes from original project