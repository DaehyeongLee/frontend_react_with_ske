import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../config/config';
import axios from 'axios';
import {Table, TableBody, TableHead, TableRow, TableCell, 
    ButtonGroup, Button, Card, CardContent, TextField, CircularProgress} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    root: {

    },
    content: {

    }
}));

function Board(props) {

    const { history } = props;
    const classes = useStyles();

    const [isLoading, setisLoading] = useState(true)
    const [boardList, setboardList] = useState([])
    const [isEdit, setisEdit] = useState(-1)
    const [editObject, seteditObject] = useState({
        title: "",
        completed: false,
        created_by: ""
    })

    useEffect(() => {
        const init = () => {
            getBoardList();
            console.log(API_BASE_URL)
        };
        setTimeout(() => {
            init();
        });
    }, [])

    // 리스트 가져옴
    const getBoardList = () => {
        axios.get(`${API_BASE_URL}/api/task/todo`).then((res) => {
            setboardList(res.data);
            setisLoading(false)
        }).catch((err) => {
            console.log(err);
        })
    }

    // Input Change Handler
    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        seteditObject(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    // 수정 버튼 Click Event
    const clickEdit = (index) => {
        setisEdit(index)
        seteditObject(boardList.find(item => item.id === index))
    }

    // 수정 Submit
    const handleEdit = () => {
        axios.put(`${API_BASE_URL}/api/task/todo/update/${isEdit}`, editObject).then((res) => {
            setisEdit(-1)
            getBoardList()
        }).catch((err) => {
            console.log(err);
        })
    }

    const tableRow = (obj, index) => (

        (obj.id != isEdit) ? (
            <TableRow
                hover
                key={obj.id}>

                {/* ID */}
                <TableCell align={"center"}>
                    {obj.id}
                </TableCell>
                {/* TITLE */}
                <TableCell align={"left"}>
                    {obj.title}
                </TableCell>
                {/* COMPLETED */}
                <TableCell align={"center"}>
                    {obj.completed.toString()}
                </TableCell>
                {/* CREATED BY */}
                <TableCell align={"center"}>
                    {obj.created_by}
                </TableCell>

                {/* BUTTON */}
                <TableCell align={"center"}>
                    <ButtonGroup
                        aria-label="text primary button group"
                    >
                        <Button
                            style={{
                                borderTopLeftRadius: 4,
                                borderBottomLeftRadius: 4
                            }}
                            onClick={() => clickEdit(obj.id)}
                        >
                            수정
                        </Button>
                    </ButtonGroup>
                </TableCell>

            </TableRow>
        )
            :
            (
                <TableRow
                    hover
                    key={obj.id}>

                    {/* ID */}
                    <TableCell align={"center"}>
                        {obj.id}
                    </TableCell>
                    {/* TITLE */}
                    <TableCell align={"left"}>
                        <TextField
                            variant="outlined"
                            onChange={handleChange}
                            name="title"
                            value={editObject.title}
                        />
                    </TableCell>
                    {/* COMPLETED */}
                    <TableCell align={"center"}>
                        <TextField
                            variant="outlined"
                            onChange={handleChange}
                            name="completed"
                            value={editObject.completed}
                        />
                    </TableCell>
                    {/* CREATED BY */}
                    <TableCell align={"center"}>
                        <TextField
                            variant="outlined"
                            onChange={handleChange}
                            name="created_by"
                            value={editObject.created_by}
                        />
                    </TableCell>

                    {/* BUTTON */}
                    <TableCell align={"center"}>
                        <ButtonGroup
                            aria-label="text primary button group"
                        >
                            <Button
                                style={{
                                    borderTopLeftRadius: 4,
                                    borderBottomLeftRadius: 4
                                }}
                                onClick={handleEdit}
                            >
                                저장
                            </Button>
                        </ButtonGroup>
                    </TableCell>
                </TableRow>
            )
    )

    return (
        <Card className={classes.root}>
            <CardContent className={classes.content}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align={"center"}>ID</TableCell>
                            <TableCell align={"center"}>TITLE</TableCell>
                            <TableCell align={"center"}>COMPLETED</TableCell>
                            <TableCell align={"center"}>CREATED_BY</TableCell>
                            <TableCell align={"center"}>ACTION</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            isLoading ?
                                <TableRow hover>
                                    <TableCell colSpan={5} align="center">
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                                :
                                boardList.length === 0 ?
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            조회된 데이터가 한 건도 없네요.
                                        </TableCell>
                                    </TableRow>
                                    :
                                    boardList.map((item, index) => tableRow(item, index))
                        }
                    </TableBody>

                </Table>
            </CardContent>
        </Card>
    )
}

export default Board
