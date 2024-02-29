import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store.ts';
import { useParams } from 'react-router-dom';
import { ReactNode, useEffect } from 'react';
import { fetchPostOne } from '../../../store/post/postThunk.ts';
import { Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import dayjs from 'dayjs';
import Comments from '../../Comments/Comments/Comments.tsx';
import AddNewComment from '../../Comments/AddNewComment/AddNewComment.tsx';
import Box from '@mui/material/Box';

const OnePost = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {id} = useParams() as { id: string };
  const {postOne, postOneLoad} = useSelector((state: RootState) => state.posts);
  const {user} = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchPostOne(id));
  }, [dispatch, id]);

  let postImage: ReactNode = <></>;

  if (postOne?.image) {
    const postOneImage = 'http://localhost:8000' + '/images/' + postOne.image;
    postImage = <CardMedia
      sx={{height: 420}}
      image={postOneImage}
      title={postOne.title}
    />;
  }

  return (

    <Box
      sx={{marginTop:'100px'}}
    >
      {

        postOneLoad ? <CircularProgress color="success" /> :
          <Grid
            container
            flexDirection="row"
            justifyContent="space-between"
            gap={5}


          >
            <Card sx={{maxWidth: 720, p: 4, flexGrow: 1}}>
              <CardHeader
                title={postOne?.title + ' / ' + postOne?.username}
                subheader={dayjs(postOne?.datetime).format('YYYY.MM.DD HH:mm')}
              />
              {postImage}
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {postOne?.description}
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{maxWidth: 720, p: 1, flexGrow: 1, flexDirection: 'column'}}>
              <Grid>
                <Comments id={id}/>
              </Grid>
              <Grid sx={{height: '30%', borderTop: '1px solid #ccc', p: 3}}>
                <Typography variant="body2" color="text.secondary">
                  {user ? 'Add a comment' : 'Please logIn to  create new comment'}
                </Typography>
                {user ? <AddNewComment/> : <></>}
              </Grid>
            </Card>
          </Grid>
      }
    </Box>
  );
};

export default OnePost;