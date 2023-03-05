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
  if (dataToDisplay === null) return <></>;
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
          let msg_intent = null,
            msg_genres = null,
            msg_actor = null,
            msg_movie = null,
            msg_daterange = null,
            msg_timestamp = element.Time_Stamp,
            msg_verbatim = element.Query_Message,
            msg_response = element.Response_Body,
            msg_phone_num = element.Destination_Phone_number,
            msg_score = element.EntityIntent_tuple.score;
          let card_fgcolor, card_bgcolor;

          if (element.EntityIntent_tuple != null) {
            msg_intent = element.EntityIntent_tuple.intents;
            card_fgcolor =
              msg_intent === "message.error" ? "#d9825f" : "#42a5f5";
            card_bgcolor =
              msg_intent === "message.error" ? "orange" : "#1976d2";

            msg_genres =
              element.EntityIntent_tuple.entities.genre !== null
                ? element.EntityIntent_tuple.entities.genre.join(", ")
                : null;
            msg_actor =
              element.EntityIntent_tuple.entities.actor !== null
                ? element.EntityIntent_tuple.entities.actor.join(", ")
                : null;
            msg_movie =
              element.EntityIntent_tuple.entities.moviename !== null
                ? element.EntityIntent_tuple.entities.moviename[0]
                : null;
            msg_daterange =
              element.EntityIntent_tuple.entities.daterange != null
                ? element.EntityIntent_tuple.entities.daterange[0]
                : null;
          }

          // console.log(`element  ----->`);
          // console.log(element);
          return (
            <>
              <Accordion
                key={index}
                sx={{
                  backgroundColor: card_bgcolor,
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
                      backgroundColor: card_fgcolor,
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
                          <u>Phone No: </u> {msg_phone_num}
                        </p>
                        <p>
                          <u>Time: </u> {msg_timestamp}
                        </p>
                        <p>
                          <u>Intent: </u> {msg_intent}
                          <br />
                          <u>Probability: </u>{" "}
                          {(msg_score + "").slice(
                            0,
                            Math.min(msg_score.length, 4)
                          )}
                        </p>
                        <p>
                          <u>Time Stamp:</u>
                          <br></br>
                          {msg_timestamp}
                        </p>
                        <p>
                          <u>Verbatim: </u>
                          {msg_verbatim}
                        </p>
                        <p>
                          <u>Response: </u> {msg_response}
                        </p>
                        {msg_intent !== "error.message" && <Divider />}
                        {msg_movie && (
                          <p>
                            <u>Movie: </u>
                            {msg_movie}
                          </p>
                        )}
                        {msg_actor && (
                          <p>
                            <u>Actors: </u>
                            {msg_actor}
                          </p>
                        )}
                        {msg_genres && (
                          <p>
                            <u>Genres: </u>
                            {msg_genres}
                          </p>
                        )}
                        {msg_daterange && (
                          <p>
                            <u>Date Range: </u>
                            {msg_daterange}
                          </p>
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
