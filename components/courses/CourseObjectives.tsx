import { ReactElement, useState } from 'react';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import CourseReview from './CourseReview';
import Curriculumb from './Curriculumb';
import { tCurriculum } from '../../types/types';
import { Check, TextSnippet } from '@mui/icons-material';

const goals = [
  'Great course',
  'Content is well paced',
  'Clear & conscice explanations',
  'nice, I love it',
];
const ranges = {
  content: 'Content',
  reviews: 'Reviews',
};
interface Props {
  category?: string;
  target?: string;
  modified?: string;
  courseName?: string;
  curriculum?: tCurriculum;
  brief: string;
  posts?: any[];
  ratings?: number | null;
}
const CourseObjectives: React.FC<Props> = (props: Props): ReactElement => {
  const {
    target,
    category,
    modified,
    courseName,
    curriculum,
    brief,
    posts,
    ratings,
  } = props;
  const [tabValue, setTabValue] = useState(0);
  return (
    <>
      <Paper className="flex flex-col py-10 px-4 md:p-10 w-full shadow rounded-2xl overflow-hidden border-2 border-t-red-500">
        <div className="flex sm:flex-row items-start justify-between">
          <Tabs
            value={tabValue}
            onChange={(ev, value) => setTabValue(value)}
            indicatorColor="secondary"
            textColor="inherit"
            variant="scrollable"
            scrollButtons={false}
            className="-mx-4 min-h-40 "
            classes={{
              indicator: 'flex justify-center bg-transparent  w-full h-full',
            }}
            TabIndicatorProps={{
              children: (
                <Box
                  sx={{ bgcolor: 'text.disabled' }}
                  className="w-full h-full rounded-full opacity-20"
                />
              ),
            }}
          >
            {Object.entries(ranges).map(([key, label]) => (
              <Tab
                className="font-semibold px-6 mx-4  md:px-12"
                disableRipple
                key={key}
                label={label}
              />
            ))}
          </Tabs>
        </div>
        <div className="w-full mt-5">
          {tabValue === 0 && (
            <div>
              <Typography variant="h6" className="mb-4">
                Overview
              </Typography>
              <Typography gutterBottom>{brief}</Typography>
              <Typography variant="subtitle1" gutterBottom>
                Target Audience: {target || 'Beginner'}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Category: {category?.toString() || 'web'}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Last Updated: {modified || 'N/A'}
              </Typography>
              <Button>Join Class</Button>
            </div>
          )}
          {tabValue === 1 && (
            <div className="flex flex-col">
              <CourseReview posts={posts} ratings={ratings} />
              {/* <div className="flex-auto grid grid-cols-4 gap-16 *mt-24">
                {goals.map((goal, index) => (
                  <div
                    key={index}
                    className="col-span-2 flex flex-col items-center justify-center py-8 px-2 rounded-2xl bg-indigo-50 text-indigo-800"
                  >
                    <Typography className="mt-4 text-sm sm:text-lg font-medium">
                      {goal}
                    </Typography>
                  </div>
                ))}
              </div> */}
            </div>
          )}
        </div>
      </Paper>
      {curriculum?.objective && (
        <Paper className="p-10 mt-8 rounded-2xl border-2 border-t-red-500">
          <Typography variant="h6" className="mb-4">
            What you will learn
          </Typography>
          <Typography variant="subtitle1" className="mb-4">
            AT the end of this course, you will:
          </Typography>
          <List>
            {curriculum?.objective?.map((obj, index) => (
              <ListItem key={index + obj}>
                <ListItemIcon>
                  <TextSnippet />
                </ListItemIcon>
                <ListItemText primary={obj} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
      {curriculum?.requirement && (
        <Paper className="p-10 mt-8 rounded-2xl border-2 border-t-red-500">
          <Typography variant="h6" className="mb-4">
            Requirements
          </Typography>
          <Typography variant="subtitle1" className="mb-4">
            Good to have the following skills before taking this course:
          </Typography>
          <List>
            {curriculum?.requirement?.map((req, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <Check />
                </ListItemIcon>
                <ListItemText primary={req} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      <Paper className="py-10 px-4 md:p-10 mt-8 rounded-2xl border-2 border-t-red-500">
        <Typography variant="h6" className="mb-4">
          Syllabus
        </Typography>
        <Curriculumb courseName={courseName} curriculum={curriculum} />
      </Paper>
    </>
  );
};

export default CourseObjectives;
