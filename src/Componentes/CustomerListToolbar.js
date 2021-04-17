import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  MenuItem
} from '@material-ui/core';
import ReplayIcon from '@material-ui/icons/Replay';
import Select from '@material-ui/core/Select';


const CustomerListToolbar = (props) => {
  const {findIntems,properyOption,SetSelectedProperyOPtion,restartSearch} = props;
  return (
      <Box {...props}>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <>
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                        onClick={() => restartSearch()}
                      >
                        <ReplayIcon />
                      </SvgIcon>
                    </InputAdornment>
                    <InputAdornment position="end">
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                    >
                      <MenuItem onClick={() => {SetSelectedProperyOPtion("none")}} value="none">
                        <em>All elements</em>
                      </MenuItem>
                      {properyOption.map(option =>{
                        return(
                          <MenuItem onClick={() => {SetSelectedProperyOPtion(option)}} value={option}>{option}</MenuItem>
                        );
                      })}
                    </Select>
                  </InputAdornment>
                  </>
                  )
                }}
                onChange={(e) =>findIntems(e.target.value)}
                placeholder="Search customer"
                variant="outlined"
              />

            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>

  );
}

export default CustomerListToolbar;
