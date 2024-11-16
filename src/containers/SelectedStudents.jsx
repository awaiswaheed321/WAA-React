import Header from '../components/Header.jsx';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import SelectedStudent from '../components/SelectedStudent.jsx';

const SelectedStudents = () => {
    const students = useSelector((state) => state.student.students);

    const studentList =
        students.length > 0 ? (
            students.map((p) => (
                <SelectedStudent key={p.id} id={p.id} name={p.name} />
            ))
        ) : (
            <h2 style={{ textAlign: 'center', color: 'gray' }}>
                No student selected
            </h2>
        );
    return (
        <div>
            <Header />
            <Box sx={{ marginTop: 2, marginBottom: 2 }}>
                <Box display="flex" flexWrap="wrap" gap={2}>
                    {studentList}
                </Box>
            </Box>
        </div>
    );
};

export default SelectedStudents;
