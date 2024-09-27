"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import DepartmentCard from './DepartmentCard';
import toast from 'react-hot-toast';
import Loading from '../_components/Loading/Loading';

const DepartmentPage = () => {
    const [doctorData, setDoctorData] = useState('');
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);


    let index = 0;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from your API endpoint for departments
                const response = await fetch('/api/department');

                if (response.status === 200) {
                    const data = await response.json();
                    console.log(data.data);
                    // Set the retrieved data to the state
                    setDepartments(data.data);
                } else {
                    toast.error('Failed to load departments');
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                toast.error('Error loading data');
                console.error('Error fetching department data:', error);
            }finally {
                setLoading(false);
            }
        };

        // Fetch data when the component mounts
        fetchData();
    }, []);

    if (loading) return <div className=" bg-gray-300 ds py-20 px-5 text-center">
        <Loading />
    </div >;
    return (
        <>
            {Array.isArray(departments) && departments.length > 0 ? (
                <div className="bg-gray-300  ds py-20 px-5 text-center">
                    <div>
                        <h2 className="font-bold text-4xl tracking-wide m-4">
                            <span className="text-blue-500">All Departments</span>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {departments.map((department) => (
                                <div key={department._id}>
                                    <DepartmentCard key={department._id} department={department} index={index++} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading departments...</div>
            )}
        </>
    );
};

export default DepartmentPage;
