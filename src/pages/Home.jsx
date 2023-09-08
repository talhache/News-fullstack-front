import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';

// import axios from '../axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews, fetchTags } from '../features/news.slices';


export const Home = () => {

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.login.data)
  const news = useSelector((state) => state.news)
  const tags = useSelector(state => state.news)

  const isNewsLoading = news.news.status === 'loading';
  const isTagsLoading = tags.tags.status === 'loading';
  
  
  React.useEffect(() => {
    dispatch(fetchNews());
    dispatch(fetchTags());
  }, [dispatch])
  
  console.log(userData);
  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isNewsLoading ? [...Array(5)] : news.news.items).map((obj, index) => {
            return (isNewsLoading ? (<Post key={index} isLoading={true} />) : (
              <Post
                id={obj._id}
                title={obj.title}
                imageUrl={obj.image ? `http://localhost:4444${obj.image}` : ''}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable={userData?.user._id === obj.user._id}
                />
                ))
              }
              )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Баба яга',
                  avatarUrl: 'https://s4.afisha.ru/mediastorage/c7/e9/9a5f0740106d4bc586318d62e9c7.jpg',
                },
                text: 'х1ар х1у пал йу',
              },
              {
                user: {
                  fullName: 'Усама',
                  avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Osama_bin_Laden_portrait.jpg/250px-Osama_bin_Laden_portrait.jpg',
                },
                text: 'lorem ipsum',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
