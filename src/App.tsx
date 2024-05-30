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
