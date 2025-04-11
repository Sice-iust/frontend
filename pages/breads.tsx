import React from 'react';

export default async function bread({params}) {
    const { id } = await params;
    return (
        <>
        <div>
            {id} page not implimented yet
        </div>
        </>
    );
}