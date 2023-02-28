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

export function GenerateDataCard({ dataToDisplay }) {
  console.log(dataToDisplay);
  return (
    <Paper
      elevation={3}
      style={{
        width: "100%",
        backgroundColor: "#42a5f5",
        height: "100%",
        overflow: "scroll",
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
          // maxHeight: 400,
          "& ul": { padding: 0 },
        }}
      >
        {dataToDisplay.map((element, index) => {
          console.log(`element  ----->`);
          console.log(element);
          return (
            <>
              <Accordion
                key={index}
                sx={{
                  backgroundColor:
                    element.EntityIntent_tuple.intents === "message.error"
                      ? "orange"
                      : "#1976d2",
                  color: "white",
                }}
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
                    {element.EntityIntent_tuple.intents}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Paper
                    elevation={3}
                    style={{
                      width: "100%",
                      backgroundColor:
                        element.EntityIntent_tuple.intents === "message.error"
                          ? "#d9825f"
                          : "#42a5f5",
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
                          {element.Time_Stamp}
                        </p>
                        <Divider />
                        <p>
                          <u>Intent:</u>
                          <br></br>
                          {element.EntityIntent_tuple.intents}
                        </p>
                        {element.EntityIntent_tuple.entities.genre !== null &&
                          element.EntityIntent_tuple.entities.genre.length >
                            0 && (
                            <>
                              <Divider />
                              <p>
                                <u>Genre:</u>
                                <br></br>
                                {element.EntityIntent_tuple.entities.genre.join(
                                  ", "
                                )}
                              </p>
                            </>
                          )}
                        {element.EntityIntent_tuple.entities.actor !== null &&
                          element.EntityIntent_tuple.entities.actor.length >
                            0 && (
                            <>
                              <Divider />
                              <p>
                                <u>Cast:</u>
                                <br></br>
                                {element.EntityIntent_tuple.entities.actor.join(
                                  ", "
                                )}
                              </p>
                            </>
                          )}
                        {element.EntityIntent_tuple.entities.daterange !==
                          null &&
                          element.EntityIntent_tuple.entities.daterange.length >
                            0 && (
                            <>
                              <Divider />
                              <p>
                                <u>Year Requested:</u>
                                <br></br>
                                {
                                  element.EntityIntent_tuple.entities
                                    .daterange[0]
                                }
                              </p>
                            </>
                          )}
                        {element.EntityIntent_tuple.entities.moviename !==
                          null &&
                          element.EntityIntent_tuple.entities.moviename.length >
                            0 && (
                            <>
                              <Divider />
                              <p>
                                <u>Movie Mentioned:</u>
                                <br></br>
                                {
                                  element.EntityIntent_tuple.entities
                                    .moviename[0]
                                }
                              </p>
                            </>
                          )}
                        {element.Query_Message !== null && (
                          <>
                            <Divider />
                            <p>
                              <u>User Message:</u>
                              <br></br>
                              {element.Query_Message}
                            </p>
                          </>
                        )}
                        {element.Response_Body !== null && (
                          <>
                            <Divider />
                            <p>
                              <u>Response:</u>
                              <br></br>
                              {element.Response_Body}
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
