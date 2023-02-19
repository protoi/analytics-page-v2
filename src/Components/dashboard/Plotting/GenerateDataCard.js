import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  List,
  Paper,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export function GenerateDataCard({dataToDisplay}) {
  return (
    <Paper
      elevation={3}
      style={{
        width: "100%",
        backgroundColor: "#42a5f5",
        // maxHeight: "100%",
        // overflow: "auto",
        // outline: "1px green solid",
      }}
    >
      <List
        sx={{
          width: "100%",
          bgcolor: "#42a5f5",
          position: "relative",
          overflow: "auto",
          maxHeight: 600,
          "& ul": { padding: 0 },
        }}
      >
        {dataToDisplay.map((element, index) => {
          return (
            <>
              <Accordion
                key={index}
                sx={{ backgroundColor: "#1976d2", color: "white" }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id={index}
                >
                  <Typography
                    align="left"
                    sx={{ padding: "3%", color: "white" }}
                  >
                    {element.intent}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Paper
                    elevation={3}
                    style={{
                      width: "100%",
                      backgroundColor: "#42a5f5",
                    }}
                  >
                    <div>
                      <Typography
                        display="block"
                        align="left"
                        padding={"5%"}
                        sx={{ color: "white" }}
                      >
                        <p>
                          <u>Time Stamp:</u>
                          <br></br>
                          {element.timestamp}
                        </p>
                        <Divider />
                        <p>
                          <u>Intent:</u>
                          <br></br>
                          {element.intent}
                        </p>
                        {element.genre !== null && element.genre.length > 0 && (
                          <>
                            <Divider />
                            <p>
                              <u>Genre:</u>
                              <br></br>
                              {element.genre.join(", ")}
                            </p>
                          </>
                        )}
                        {element.actor !== null && element.actor.length > 0 && (
                          <>
                            <Divider />
                            <p>
                              <u>Cast:</u>
                              <br></br>
                              {element.actor.join(", ")}
                            </p>
                          </>
                        )}
                        {element.daterange !== null &&
                          element.daterange.length > 0 && (
                            <>
                              <Divider />
                              <p>
                                <u>Year Requested:</u>
                                <br></br>
                                {element.daterange[0]}
                              </p>
                            </>
                          )}
                        {element.moviename !== null &&
                          element.moviename.length > 0 && (
                            <>
                              <Divider />
                              <p>
                                <u>Movie Mentioned:</u>
                                <br></br>
                                {element.moviename[0]}
                              </p>
                            </>
                          )}
                        {element.actual_message !== null && (
                          <>
                            <Divider />
                            <p>
                              <u>User Message:</u>
                              <br></br>
                              {element.actual_message}
                            </p>
                          </>
                        )}
                        {element.response_message !== null && (
                          <>
                            <Divider />
                            <p>
                              <u>Response:</u>
                              <br></br>
                              {element.response_message}
                            </p>
                          </>
                        )}
                      </Typography>
                    </div>
                  </Paper>
                </AccordionDetails>
              </Accordion>
              <Divider />
            </>
          );
        })}
      </List>
    </Paper>
  );
}
