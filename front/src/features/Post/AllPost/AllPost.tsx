import Grid from '@mui/material/Grid';
import { fetchPosts } from '../../../store/post/postThunk.ts';
import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/store.ts';
import Typography from '@mui/material/Typography';
import { Card, CardContent, CardMedia } from '@mui/material';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import img from '..//..//../assets/img.jpeg';


const AllPost = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {posts, fetchLoading} = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);


  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
        </Grid>
        <Grid item>
        </Grid>
      </Grid>

      <Grid container item flexDirection="column" alignItems="center" gap={3}>
        {
          fetchLoading ? <CircularProgress/> :
            posts.map((post) => (
              <Box key={post.id_post}>
                <Grid item width="40%" component={Link} to={'/posts/' + post.id_post}>
                  <Card sx={{display: 'flex', mb: 1,width:'500px'}} style={{backgroundColor: '#f5f5f5'}}>


                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                      <CardContent sx={{flex: '1 0 auto'}}>
                        <Typography component="div" variant="h6" fontWeight="fontWeightBold">
                          {post.title}
                        </Typography>
                        <Typography component="div" variant="h6" fontWeight="medium" fontStyle="oblique">
                          {post.username}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div" fontSize={14}
                                    fontStyle="oblique">
                          {dayjs(post.datetime).format('YYYY.MM.DD HH:mm')}
                        </Typography>
                        {post.image ? (
                          <CardMedia
                            sx={{height: 350}}
                            image={`http://localhost:8000/${post.image}`}
                          />
                        ) : (
                          <CardMedia
                            sx={{height: 350}}
                            image={img}
                          />
                        )}
                      </CardContent>
                    </Box>

                  </Card>
                </Grid>
              </Box>
            ))}
      </Grid>
    </Grid>
  );
};

export default AllPost;