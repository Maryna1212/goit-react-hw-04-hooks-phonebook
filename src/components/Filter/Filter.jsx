import PropTypes from 'prop-types';
import { FilterContainer, FilterLabel, FilterInput } from './Filter.styled';

const Filter = ({ value, onChange }) => (
  <FilterContainer>
    <FilterLabel>Find contacts by name</FilterLabel>
    <FilterInput type="text" value={value} onChange={onChange} />
  </FilterContainer>
);

export default Filter;

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
