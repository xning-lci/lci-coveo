import { buildTab, SearchEngine, SearchEngine as SearchEngineType } from "@coveo/headless";
import Grid from "@mui/material/Grid";
import React, { useEffect } from 'react';


export type TabProps = {
  id: string;
  expression: string;
  selected?: boolean;
  label: string;
  engine: SearchEngineType,
};

export function Tab({engine, id, expression, selected, label}: TabProps) {
  const headlessTab = buildTab(engine, {
    options: {
      expression,
      id,
    },
  })
  //
  // useEffect(() => {
  //   if (selected) {
  //     headlessTab.select();
  //   }
  // }, [selected]);

  return (
    <button
      onClick={() => headlessTab.select()}
      style={{backgroundColor: selected ? 'gray' : 'white',  height: 30}}
    >
      {label}
    </button>
  );
}

export const CategoryTabs = ({engine}: { engine: SearchEngine }) => {
  const [selectedTab, setSelectedTab] = React.useState('tablAll');

  return <Grid container spacing={2} style={{'width': '50%', margin: 'auto'}}>
    <Grid item md={3} onClick={() => setSelectedTab('tablAll')}>
      <Tab engine={engine} expression={''} id={'tablAll'} label={'All'} selected={selectedTab === 'tablAll'}/>
    </Grid>
    <Grid item md={3} onClick={() => setSelectedTab('tabNews')}>
      <Tab engine={engine} expression={'@lci_category==News'} id={'tabNews'} label={'News'}
           selected={selectedTab === 'tabNews'}/>
    </Grid>
    <Grid item md={3} onClick={() => setSelectedTab('tabEvents')}>
      <Tab engine={engine} expression={'@lci_category==Events'} id={'tabEvents'} label={'Events'}
           selected={selectedTab === 'tabEvents'}/>
    </Grid>
    <Grid item md={3} onClick={() => setSelectedTab('tabPrograms')}>
      <Tab engine={engine} expression={'@lci_category==Programs'} id={'tabPrograms'} label={'Programs'}
           selected={selectedTab === 'tabPrograms'}/>
    </Grid>
  </Grid>
}
