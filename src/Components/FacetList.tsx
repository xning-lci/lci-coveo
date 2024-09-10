import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Facet from './Facet';

const FacetList = () => {
  return (
    <Box>
      <Box px={1} pb={1}>
        <Typography variant="overline">Refine By</Typography>
        <Facet field="lci_faculties_and_schools" facetId="facultiesAndSchools" title="Faculties And Schools" />
        <Facet field="lci_fields_of_study" facetId="fieldsOfStudy" title="Fields Of Study" />
      </Box>
    </Box>
  );
};

export default FacetList;
