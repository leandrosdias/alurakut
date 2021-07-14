import React from 'react';
import Select from 'react-select';

const options = [
    { value: 'Arizona Cardinals', label: 'Arizona Cardinals' },
    { value: 'Atlanta Falcons', label: 'Atlanta Falcons' },
    { value: 'Baltimore Ravens', label: 'Baltimore Ravens' },
    { value: 'Buffalo Bills', label: 'Buffalo Bills' },
    { value: 'Chicago Bears', label: 'Chicago Bears' },
    { value: 'Cincinnati Bengals', label: 'Cincinnati Bengals' },
];

class App extends React.Component {
    state = {
        selectedOption: null,
    }
    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
    }
    render() {
        const { selectedOption } = this.state;

        return (
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
                name = {this.props.name}
            />
        );
    }
}

export default App;