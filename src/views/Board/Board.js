import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../config/config';
import axios from 'axios';
import * as MC from "@material-ui/core";
import * as MS from "@material-ui/styles";

const useStyles = MS.makeStyles(theme => ({
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

    useEffect(() => {
        const init = () => {
            getBoardList();
            console.log(API_BASE_URL)
        };
        setTimeout(() => {
            init();
        });
    }, [])

    const getBoardList = () => {
        axios.get(`${API_BASE_URL}/api/task/todo`).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }

    const tableRow = (obj, index) => (
        <MC.TableRow
            hover
            key={obj.id}>

            {/* ID */}
            <MC.TableCell align={"center"}>
                {obj.id}
            </MC.TableCell>
            {/* TITLE */}
            <MC.TableCell align={"left"}>
                {obj.title}
            </MC.TableCell>
            {/* COMPLETED */}
            <MC.TableCell align={"center"}>
                {obj.completed}
            </MC.TableCell>
            {/* CREATED BY */}
            <MC.TableCell align={"center"}>
                {obj.created_by}
            </MC.TableCell>

            {/* BUTTON */}
            <MC.TableCell align={"center"}>
                <MC.ButtonGroup
                    aria-label="text primary button group"
                >
                    <MC.Button
                        style={{
                            borderTopLeftRadius: 4,
                            borderBottomLeftRadius: 4
                        }}
                    >
                        수정
                    </MC.Button>
                </MC.ButtonGroup>
            </MC.TableCell>

        </MC.TableRow>
    )

    return (
        <MC.Card className={classes.root}>
            <MC.CardContent className={classes.content}>
                <MC.Table size="small">
                    <MC.TableHead>
                        <MC.TableRow>
                            <MC.TableCell align={"center"}>ID</MC.TableCell>
                            <MC.TableCell align={"center"}>TITLE</MC.TableCell>
                            <MC.TableCell align={"center"}>COMPLETED</MC.TableCell>
                            <MC.TableCell align={"center"}>CREATED_BY</MC.TableCell>
                        </MC.TableRow>
                    </MC.TableHead>
                    <MC.TableBody>
                        {
                            isLoading ?
                                <MC.TableRow hover>
                                    <MC.TableCell colSpan={4} align="center">
                                        <MC.CircularProgress />
                                    </MC.TableCell>
                                </MC.TableRow>
                                :
                                boardList.length === 0 ?
                                    <MC.TableRow>
                                        <MC.TableCell colSpan={4} align="center">
                                            조회된 이사예약 데이터가 한 건도 없네요.
                                        </MC.TableCell>
                                    </MC.TableRow>
                                    :
                                    boardList.map((item, index) => tableRow(item, index))
                        }
                    </MC.TableBody>

                </MC.Table>
            </MC.CardContent>
        </MC.Card>
    )
}

export default Board
