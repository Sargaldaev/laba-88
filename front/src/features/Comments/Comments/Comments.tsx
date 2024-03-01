import React, { useEffect } from 'react';
import List from '@mui/material/List';
import CircularProgress from '@mui/material/CircularProgress';
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store.ts';
import { fetchComments } from '../../../store/comment/commentThunk.ts';
import TextsmsIcon from '@mui/icons-material/Textsms';
import Typography from '@mui/material/Typography';


interface Props {
  id: string;
}

const Comments: React.FC<Props> = ({id}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {createLoading, comments} = useSelector((state: RootState) => state.comments);

  useEffect(() => {
    dispatch(fetchComments(id));
  }, [dispatch, id]);
  return (
    <List sx={{width: '100%', height: '500px', bgcolor: 'background.paper', overflowY: 'auto'}}>
      {comments.length === 0 ? <Typography>
        Comments are empty, add a comment !</Typography> : null}
      {
        createLoading ? <CircularProgress/> :
          comments.map((item) => (
            <ListItem key={item._id}>
              <ListItemAvatar>
                <Avatar>
                  <TextsmsIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.user.username} secondary={item.body}/>
            </ListItem>
          ))}
    </List>
  );
};

export default Comments;