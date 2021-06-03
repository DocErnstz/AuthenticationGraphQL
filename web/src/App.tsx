import React from "react";
import { gql, useQuery } from "@apollo/client";


const App: React.FC = () => {
    const {data, loading} = useQuery(gql`
    {
        hello
    }
    `);
    if (loading) {
        return <div>loading...</div>
    }
    console.log(data);
    return (
        <div>{JSON.stringify(data)}</div>
    );
}

export default App;