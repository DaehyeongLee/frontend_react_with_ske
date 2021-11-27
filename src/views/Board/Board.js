import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../config/config';
import axios from 'axios';
import {
    Table, TableBody, TableHead, TableRow, TableCell, Grid,
    ButtonGroup, Button, Card, CardContent, CardActions, Divider,
    TextField, CircularProgress
} from "@material-ui/core";
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
    const [editId, setEditId] = useState(-1)
    const [isAdd, setisAdd] = useState(false)
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
    const clickEdit = (obj) => {
        setEditId(obj.id)
        seteditObject(obj)
    }

    // 등록/수정 Submit
    const handleEdit = () => {
        // 등록
        if (isAdd) {
            axios.post(`${API_BASE_URL}/api/task/todo/create`, {
                title: editObject.title,
                completed: editObject.completed,
                created_by: editObject.created_by
            }).then((res) => {
                setEditId(-1)
                getBoardList()
                setisAdd(false)
            }).catch((err) => {
                console.log(err);
            })
        }
        // 수정
        else {
            axios.put(`${API_BASE_URL}/api/task/todo/update/${editId}`, editObject).then((res) => {
                setEditId(-1)
                getBoardList()
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    // 등록 버튼 Click Event
    const clickAdd = () => {
        setisAdd(true)
        if (boardList.length > 0) {
            setEditId(boardList[boardList.length-1].id + 1)
            setboardList([...boardList, {
                id: boardList[boardList.length-1].id + 1,
                title: "",
                completed: false,
                created_by: ""
            }])
        }
        else {
            setEditId(1)
            setboardList([...boardList, {
                id: 1,
                title: "",
                completed: false,
                created_by: ""
            }])
        }
    }

    // 취소 버튼 Click Event
    const handleCancel = () => {
        setisAdd(false)
        setEditId(-1)
        setboardList(boardList.splice(0, boardList.length - 1))
    }

    const clickDelete = (id) => {
        axios.delete(`${API_BASE_URL}/api/task/todo/delete/${id}`).then((res) => {
            setEditId(-1)
            getBoardList()
        }).catch((err) => {
            console.log(err);
        })
    }

    const tableRow = (obj, index) => (

        (obj.id != editId) ? (
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
                            onClick={() => clickEdit(obj)}
                        >
                            수정
                        </Button>
                        <Button
                            style={{
                                borderTopLeftRadius: 4,
                                borderBottomLeftRadius: 4
                            }}
                            onClick={() => clickDelete(obj.id)}
                        >
                            삭제
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
                        {!isAdd && obj.id}
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
                            {
                                isAdd &&
                                <Button
                                    style={{
                                        borderTopLeftRadius: 4,
                                        borderBottomLeftRadius: 4
                                    }}
                                    onClick={handleCancel}
                                >
                                    취소
                                </Button>
                            }

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
            <Divider />
            <CardActions>
                <Grid container justifyContent={"flex-end"} alignItems={"center"} style={{ padding: "0px 20px" }}>
                    <ButtonGroup
                        aria-label="text primary button group"
                        color="primary">
                        <Button
                            onClick={clickAdd}
                            disabled={isAdd}>
                            등록
                        </Button>
                    </ButtonGroup>
                </Grid>
            </CardActions>

        </Card>
    )
}

export default Board
