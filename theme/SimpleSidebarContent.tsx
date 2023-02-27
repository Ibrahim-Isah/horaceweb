import React from 'react';

import { useSelector } from 'react-redux';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { selectContrastMainTheme } from 'app/store/fuse/settingsSlice';
import clsx from 'clsx';

function SimpleSidebarContent(props) {
  const theme = useTheme();
  const contrastTheme = useSelector(
    selectContrastMainTheme(theme.palette.primary.main)
  );

  return (
    <FuseScrollbars enable={props.innerScroll}>
      {props.header && (
        <ThemeProvider theme={contrastTheme}>
          <div className={clsx('FusePageSimple-sidebarHeader', props.variant)}>
            {props.header}
          </div>
        </ThemeProvider>
      )}

      {props.content && (
        <div className="FusePageSimple-sidebarContent">{props.content}</div>
      )}
    </FuseScrollbars>
  );
}

export default SimpleSidebarContent;
