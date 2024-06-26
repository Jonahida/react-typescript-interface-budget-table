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
