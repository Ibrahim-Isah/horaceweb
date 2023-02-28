import React, { ReactElement, useContext } from 'react';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Home from '@mui/icons-material/Home';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import QuizIcon from '@mui/icons-material/Quiz';
import NoteIcon from '@mui/icons-material/Note';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import SchoolIcon from '@mui/icons-material/School';
import { AppDpx } from '../../context/AllProvider';
import { LECTURE_SET } from '../../context/actions';
import { tCurriculum } from '../../types/types';

const data = [
	{ icon: <PlayCircleIcon />, label: 'lecture' },
	{ icon: <QuizIcon />, label: 'quiz' },
	{ icon: <NoteIcon />, label: 'note' },
	{ icon: <SlideshowIcon />, label: 'slide' },
];

const FireNav = styled(List)<{ component?: React.ElementType }>({
	'& .MuiListItemButton-root': {
		paddingLeft: 24,
		paddingRight: 24,
	},
	'& .MuiListItemIcon-root': {
		minWidth: 0,
		marginRight: 16,
	},
	'& .MuiSvgIcon-root': {
		fontSize: 20,
	},
});
interface Props {
	isClass?: boolean;
	curriculum?: tCurriculum;
	courseName?: string;
}
const Curriculumb: React.FC<Props> = (props: Props): ReactElement => {
	const { curriculum, courseName } = props;
	const [selected, setSel] = React.useState<string>('1');
	const dispatch = useContext(AppDpx);
	const doSel = (id: string) => {
		setSel((v) => (v === id ? '' : id));
	};
	return (
		<Box className="flex h-screen w-64 mr-8">
			<Paper elevation={0}>
				<FireNav component="nav" disablePadding>
					<ListItemButton component="a" href="#customized-list">
						<ListItemIcon sx={{ fontSize: 20 }}>
							<SchoolIcon />
						</ListItemIcon>
						<ListItemText
							sx={{ my: 0 }}
							primary="Details"
							primaryTypographyProps={{
								fontSize: 20,
								fontWeight: 'medium',
								letterSpacing: 0,
							}}
						/>
					</ListItemButton>
					<Divider />
					<ListItem component="div" disablePadding>
						<ListItemButton className="h-18">
							<ListItemIcon>
								<Home color="primary" />
							</ListItemIcon>
							<ListItemText
								primary={courseName || ''}
								primaryTypographyProps={{
									color: 'primary',
									fontWeight: 'medium',
									variant: 'body2',
								}}
							/>
						</ListItemButton>
					</ListItem>
					<Divider />
					{curriculum?.section.map((item) => (
						<Box
							key={item.id}
							sx={{
								bgcolor: selected === item.id ? 'rgba(71, 98, 130, 0.2)' : null,
								pb: selected === item.id ? 2 : 0,
							}}
						>
							<ListItemButton
								alignItems="flex-start"
								onClick={() => doSel(item.id)}
								sx={{
									px: 3,
									pt: 2.5,
									pb: selected === item.id ? 0 : 2.5,
									'&:hover, &:focus': {
										'& svg': { opacity: selected === item.id ? 1 : 0 },
									},
								}}
							>
								<ListItemText
									primary={item.title}
									primaryTypographyProps={{
										fontSize: 15,
										fontWeight: 'medium',
										lineHeight: '20px',
										mb: '2px',
									}}
									secondary={item.description}
									secondaryTypographyProps={{
										noWrap: true,
										fontSize: 12,
										lineHeight: '16px',
										color:
											selected === item.id
												? 'rgba(0,0,0,0)'
												: 'rgba(255,255,255,0.5)',
									}}
									sx={{ my: 0 }}
								/>
								<KeyboardArrowDown
									sx={{
										mr: -1,
										opacity: 0,
										transform:
											selected === item.id ? 'rotate(-180deg)' : 'rotate(0)',
										transition: '0.2s',
									}}
								/>
							</ListItemButton>
							{selected === item.id &&
								item?.lecture?.map((item) => (
									<ListItemButton
										key={item.title}
										sx={{
											py: 0,
											minHeight: 32,
											color: 'rgba(255,255,255,.8)',
										}}
									>
										<ListItemIcon sx={{ color: 'inherit' }}>
											{data.find((i) => i.label === item.type)?.icon}
										</ListItemIcon>
										<ListItemText
											primary={item.title}
											primaryTypographyProps={{
												fontSize: 14,
												fontWeight: 'medium',
											}}
											onClick={() =>
												dispatch({ type: LECTURE_SET, data: item })
											}
										/>
									</ListItemButton>
								))}
						</Box>
					))}
				</FireNav>
			</Paper>
		</Box>
	);
};

export default Curriculumb;
