import Header from '../components/Header.jsx';
import { useEffect, useState } from 'react';
import DataFetchingService from '../services/DataFetchingService.js';
import Student from '../components/Student.jsx';
import Box from '@mui/material/Box';
import StudentDetail from '../components/StudentDetail.jsx';

const Students = () => {
    const [students, setStudents] = useState([]);
    const [showStudentDetail, setShowStudentDetail] = useState(false);
    const [selectedSudentId, setSelectedStudentId] = useState(null);

    const fetchStudents = async () => {
        try {
            const students = await DataFetchingService.getAllStudents();
            setStudents(students);
        } catch (error) {
            console.error('Error fetching Students:', error);
        }
    };

    useEffect(() => {
        fetchStudents().then();
    }, []);

    const handleStudentCardClick = async (postId) => {
        setSelectedStudentId(postId);
        setShowStudentDetail(true);
    };

    const studentList = students.map((p) => (
        <Student
            key={p.id}
            id={p.id}
            name={p.name}
            handleCardClick={handleStudentCardClick}
        />
    ));

    return (
        <div>
            <Header />
            <Box sx={{ marginTop: 2, marginBottom: 2 }}>
                <Box display="flex" flexWrap="wrap" gap={2}>
                    {studentList}
                </Box>
            </Box>
            {showStudentDetail && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <StudentDetail
                        fetchStudents={fetchStudents}
                        selectedStudentId={selectedSudentId}
                        setSelectedStudentId={setSelectedStudentId}
                        setShowStudentDetail={setShowStudentDetail}
                    />
                </Box>
            )}
        </div>
    );
};

export default Students;
