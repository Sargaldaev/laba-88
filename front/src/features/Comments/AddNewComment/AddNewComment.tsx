import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store.ts';
import { CommentMutation } from '../../../types';
import { createComment, fetchComments } from '../../../store/comment/commentThunk.ts';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import SendIcon from '@mui/icons-material/Send';
import { TextField } from '@mui/material';

const AddNewComment = () => {
  const {id} = useParams() as { id: string };
  const dispatch = useDispatch<AppDispatch>();
  const {createLoading} = useSelector((state: RootState) => state.comments);
  const {postOne} = useSelector((state: RootState) => state.posts);
  const [state, setState] = useState<CommentMutation>({
    post: '',
    body: '',
  });

  const submitFormHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(createComment(state)).unwrap();
      await dispatch(fetchComments(id));
    } catch (e) {
      alert('Invalid field');
    }
    setState({
      post: '',
      body: '',
    });
  };
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    if (postOne?.id_post) {
      setState(prevState => {
        return {...prevState, [name]: value, post: postOne?.id_post};
      });
    }
  };
  return (
    <form
      autoComplete="off"
      onSubmit={submitFormHandler}
    >
      <Grid container direction="column" spacing={1}>
        <Grid item xs mt={2}>
          <TextField
            required
            id="comment" label="Comment"
            multiline
            rows={2}
            value={state.body}
            onChange={inputChangeHandler}
            name="body"
            fullWidth
          />
        </Grid>

        <Grid item xs>
          <LoadingButton
            type="submit"
            size="small"
            endIcon={<SendIcon/>}
            loadingPosition="end"
            variant="contained"
            loading={createLoading}
          >
            Send
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddNewComment;