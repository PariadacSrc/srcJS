import React, { useContext, useState } from "react";
import {
  pdf,
  Document,
  PDFViewer,
  Page,
  Text,
  View,
  Image,
  StyleSheet
} from "@react-pdf/renderer";
import {
  Table,
  TableCell,
  TableBody,
  TableHeader,
  DataTableCell
} from "@david.kucsai/react-pdf-table";
import ReactTooltip from "react-tooltip";
//AppContexts
import { AthletesContext } from "../../actionscontext/AthletesContext";
//Helpers
import {
  getTotal,
  getAllAthletes,
  getCostTotal
} from "../../layouts/blocks/TournamentsTotals";

const mainPDFStyles = StyleSheet.create({
  body: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: "5%"
  },
  logo: {
    marginVertical: 30,
    width: "14%"
  },
  headertitle: {
    position: "absolute",
    right: 5,
    top: 30,
    width: "40%",
    textAlign: "right"
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "stretch"
  },
  tableheader: {
    fontSize: "9pt",
    border: "0px",
    textAlign: "left",
    paddingBottom: 15,
    fontWeight: "bold"
  },
  tablesmall: {
    minWidth: "1%"
  },
  tableregular: {
    minWidth: "3%"
  },
  tablebig: {
    minWidth: "10%"
  },
  tableExtraBig: {
    minWidth: "11%"
  },
  tablebody: {
    fontSize: "8pt",
    border: "0px",
    paddingTop: 3,
    paddingBottom: 5,
    textAlign: "left"
  },
  totaltitle: {
    fontSize: "12pt",
    marginBottom: 5,
    marginTop: 15
  },
  totalsbody: {
    fontSize: "11pt"
  }
});

const noMargin = {
  includeLeftBorder: false,
  includeRightBorder: false,
  includeTopBorder: false
};

const AthletePDFTemplate = (list, page, title) => {
  return (
    <Page orientation="landscape" size="A4" style={mainPDFStyles.body}>
      <View>
        <Image
          src={`${process.env.PUBLIC_URL}/assets/img/resource/logo-dark.png`}
          style={mainPDFStyles.logo}
        ></Image>
        <Text style={mainPDFStyles.headertitle}>{title}</Text>
      </View>
      <View style={mainPDFStyles.container}>
        <Table data={list}>
          <TableHeader textAlign={"center"} {...noMargin}>
            <TableCell
              styles={{
                ...mainPDFStyles.tableheader,
                ...mainPDFStyles.tablebig
              }}
            >
              Dojo
            </TableCell>
            <TableCell
              styles={{
                ...mainPDFStyles.tableheader,
                ...mainPDFStyles.tableExtraBig
              }}
            >
              Athlete
            </TableCell>
            <TableCell
              styles={{
                ...mainPDFStyles.tableheader,
                ...mainPDFStyles.tablesmall
              }}
            >
              Category
            </TableCell>

            <TableCell
              styles={{
                ...mainPDFStyles.tableheader,
                ...mainPDFStyles.tableregular
              }}
            >
              Event Type
            </TableCell>
            <TableCell styles={mainPDFStyles.tableheader}>
              Register Date
            </TableCell>
            <TableCell
              styles={{
                ...mainPDFStyles.tableheader,
                ...mainPDFStyles.tableregular
              }}
            >
              Payment Status
            </TableCell>
            <TableCell styles={mainPDFStyles.tableheader}>
              Payment Date
            </TableCell>
            <TableCell styles={mainPDFStyles.tableheader}>Gender</TableCell>
            <TableCell styles={mainPDFStyles.tableheader}>Age</TableCell>
            <TableCell styles={mainPDFStyles.tableheader}>Weight</TableCell>
            <TableCell styles={mainPDFStyles.tableheader}>Belt</TableCell>
          </TableHeader>
          <TableBody {...noMargin}>
            <DataTableCell
              styles={{
                ...mainPDFStyles.tablebody,
                ...mainPDFStyles.tablebig
              }}
              getContent={r => r.dojo_name}
            />
            <DataTableCell
              styles={{
                ...mainPDFStyles.tablebody,
                ...mainPDFStyles.tableExtraBig
              }}
              getContent={r => r.first_name}
            />
            <DataTableCell
              styles={{
                ...mainPDFStyles.tablebody,
                ...mainPDFStyles.tablesmall
              }}
              getContent={r => r.id_category}
            />

            <DataTableCell
              styles={{
                ...mainPDFStyles.tablebody,
                ...mainPDFStyles.tableregular
              }}
              getContent={r => (
                <View>
                  {r.kata === "y" ? <Text>Kata</Text> : null}
                  {r.kumite === "y" ? <Text>Kumite</Text> : null}
                  {r.seminar === "y" ? <Text>Parakarate</Text> : null}
                </View>
              )}
            />
            <DataTableCell
              styles={mainPDFStyles.tablebody}
              getContent={r => r.record_date}
            />
            <DataTableCell
              styles={{
                ...mainPDFStyles.tablebody,
                ...mainPDFStyles.tableregular
              }}
              getContent={r => r.status_payment}
            />
            <DataTableCell
              styles={mainPDFStyles.tablebody}
              getContent={r => r.payment_date}
            />
            <DataTableCell
              styles={mainPDFStyles.tablebody}
              getContent={r => r.gender}
            />
            <DataTableCell
              styles={mainPDFStyles.tablebody}
              getContent={r => r.age}
            />
            <DataTableCell
              styles={mainPDFStyles.tablebody}
              getContent={r => r.weight}
            />
            <DataTableCell
              styles={mainPDFStyles.tablebody}
              getContent={r => r.level}
            />
          </TableBody>
        </Table>
      </View>
      <View
        style={{
          width: "100%",
          position: "absolute",
          bottom: 10,
          left: 0,
          right: 0
        }}
      >
        <Text style={{ textAlign: "right", fontSize: "8pt" }}>Page {page}</Text>
      </View>
    </Page>
  );
};

const AthleteTotalPDFTemplate = (list, page, title) => {
  const totalRegistered = getTotal("Paid", list);
  const totalPreRegister = getTotal("No payment", list);
  const costTotal = getCostTotal(list);
  const kumiteTotal = totalRegistered.kumite + totalPreRegister.kumite;
  const kataTotal = totalRegistered.kata + totalPreRegister.kata;
  const seminarTotal = totalRegistered.seminar + totalPreRegister.seminar;

  return (
    <Page orientation="landscape" size="A4" style={mainPDFStyles.body}>
      <View>
        <Image
          src={`${process.env.PUBLIC_URL}/assets/img/resource/logo-dark.png`}
          style={mainPDFStyles.logo}
        ></Image>
        <Text style={mainPDFStyles.headertitle}>{title}</Text>
      </View>
      <View>
        <Text style={mainPDFStyles.totaltitle}>Total Athletes Kumite</Text>
      </View>
      <View style={mainPDFStyles.container}>
        <Table
          data={[
            {
              re: totalRegistered.kumite,
              pre: totalPreRegister.kumite,
              total: kumiteTotal
            }
          ]}
        >
          <TableHeader textAlign={"center"} {...noMargin}>
            <TableCell styles={mainPDFStyles.tableheader}>Registered</TableCell>
            <TableCell styles={mainPDFStyles.tableheader}>
              Pre-Registered
            </TableCell>
            <TableCell styles={mainPDFStyles.tableheader}>Total</TableCell>
          </TableHeader>
          <TableBody {...noMargin}>
            <DataTableCell
              styles={{
                ...mainPDFStyles.tablebody,
                ...mainPDFStyles.totalsbody
              }}
              getContent={r => `${r.re}`}
            />
            <DataTableCell
              styles={{
                ...mainPDFStyles.tablebody,
                ...mainPDFStyles.totalsbody
              }}
              getContent={r => `${r.pre}`}
            />
            <DataTableCell
              styles={{
                ...mainPDFStyles.tablebody,
                ...mainPDFStyles.totalsbody
              }}
              getContent={r => `${r.total}`}
            />
          </TableBody>
        </Table>
      </View>
      <View>
        <Text style={mainPDFStyles.totaltitle}>Total Athletes Kata</Text>
      </View>
      <View style={mainPDFStyles.container}>
        <Table
          data={[
            {
              re: totalRegistered.kata,
              pre: totalPreRegister.kata,
              total: kataTotal
            }
          ]}
        >
          <TableHeader textAlign={"center"} {...noMargin}>
            <TableCell styles={mainPDFStyles.tableheader}>Registered</TableCell>
            <TableCell styles={mainPDFStyles.tableheader}>
              Pre-Registered
            </TableCell>
            <TableCell styles={mainPDFStyles.tableheader}>Total</TableCell>
          </TableHeader>
          <TableBody {...noMargin}>
            <DataTableCell
              styles={{
                ...mainPDFStyles.tablebody,
                ...mainPDFStyles.totalsbody
              }}
              getContent={r => `${r.re}`}
            />
            <DataTableCell
              styles={{
                ...mainPDFStyles.tablebody,
                ...mainPDFStyles.totalsbody
              }}
              getContent={r => `${r.pre}`}
            />
            <DataTableCell
              styles={{
                ...mainPDFStyles.tablebody,
                ...mainPDFStyles.totalsbody
              }}
              getContent={r => `${r.total}`}
            />
          </TableBody>
        </Table>
      </View>
      <View>
        <Text style={mainPDFStyles.totaltitle}>Total Athletes Parakarate</Text>
      </View>
      <View style={mainPDFStyles.container}>
        <Table
          data={[
            {
              re: totalRegistered.seminar,
              pre: totalPreRegister.seminar,
              total: seminarTotal
            }
          ]}
        >
          <TableHeader textAlign={"center"} {...noMargin}>
            <TableCell styles={mainPDFStyles.tableheader}>Registered</TableCell>
            <TableCell styles={mainPDFStyles.tableheader}>
              Pre-Registered
            </TableCell>
            <TableCell styles={mainPDFStyles.tableheader}>Total</TableCell>
          </TableHeader>
          <TableBody {...noMargin}>
            <DataTableCell
              styles={{
                ...mainPDFStyles.tablebody,
                ...mainPDFStyles.totalsbody
              }}
              getContent={r => `${r.re}`}
            />
            <DataTableCell
              styles={{
                ...mainPDFStyles.tablebody,
                ...mainPDFStyles.totalsbody
              }}
              getContent={r => `${r.pre}`}
            />
            <DataTableCell
              styles={{
                ...mainPDFStyles.tablebody,
                ...mainPDFStyles.totalsbody
              }}
              getContent={r => `${r.total}`}
            />
          </TableBody>
        </Table>
      </View>

      <View>
        <Text style={mainPDFStyles.totaltitle}>All Totals</Text>
      </View>
      <View style={mainPDFStyles.container}>
        <Table
          data={[
            {
              totalAthl: `${getAllAthletes(list)}`,
              totalPay: `${costTotal.kumite +
                costTotal.kata +
                costTotal.seminar}$`
            }
          ]}
        >
          <TableHeader textAlign={"center"} {...noMargin}>
            <TableCell styles={mainPDFStyles.tableheader}>
              Total Athletes
            </TableCell>
            <TableCell styles={mainPDFStyles.tableheader}>
              Total Payments
            </TableCell>
          </TableHeader>
          <TableBody {...noMargin}>
            <DataTableCell
              styles={{
                ...mainPDFStyles.tablebody,
                ...mainPDFStyles.totalsbody
              }}
              getContent={r => r.totalAthl}
            />
            <DataTableCell
              styles={{
                ...mainPDFStyles.tablebody,
                ...mainPDFStyles.totalsbody
              }}
              getContent={r => r.totalPay}
            />
          </TableBody>
        </Table>
      </View>
      <View
        style={{
          width: "100%",
          position: "absolute",
          bottom: 10,
          left: 0,
          right: 0
        }}
      >
        <Text style={{ textAlign: "right", fontSize: "8pt" }}>Page {page}</Text>
      </View>
    </Page>
  );
};

const getTeamsArray = list => {
  const teams = {};

  list.map(athlete => {
    if (teams[athlete.dojo_name]) {
      teams[athlete.dojo_name].push(athlete);
    } else {
      teams[athlete.dojo_name] = [athlete];
    }
  });

  return teams;
};

export const AthleteListPDF = ({ athletes, template }) => {
  const athletesChunks = (athletes, page = 0, title) => {
    try {
      const limit = athletes.length;
      const size = 16;
      const chunks = Math.ceil(limit / size);
      let list = new Array(chunks);

      for (let i = 0; i < list.length; i++) {
        let start = i * size;
        let end = start + size > limit ? limit : start + size;
        let newList = athletes.slice(start, end);
        page++;
        list[i] = AthletePDFTemplate(newList, page, title);
      }

      return list;
    } catch (error) {
      return <Page wrap orientation="landscape" size="A4"></Page>;
    }
  };

  let pages = 0;
  const filterTemplate = template => {
    switch (template) {
      case "team":
        const dojos = Object.entries(getTeamsArray(athletes));

        return dojos.map(dojo => {
          const pdflist = athletesChunks(dojo[1], pages, `Dojo:${dojo[0]}`);
          pages = pages + pdflist.length;
          return pdflist;
        });

      default:
        const pdflist = athletesChunks(athletes, 0, ``);
        pages = pdflist.length;
        return pdflist;
    }
  };

  return (
    <Document>
      {filterTemplate(template)}
      {AthleteTotalPDFTemplate(athletes, pages + 1, "Athletes Totals")}
    </Document>
  );
};

export const BlobDocument = (component, handler, filename) => {
  const documentDate = new Date();

  const newBlob = pdf(component).toBlob();

  try {
    return newBlob.then(blob => {
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      document.body.appendChild(a);
      a.href = url;
      a.download = `${filename}-${documentDate.getDay()}${documentDate.getMonth()}${documentDate.getFullYear()}.pdf`;
      a.click();
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        handler();
      }, 0);
      return null;
    });
  } catch (error) {
    return null;
  }
};

export const DownLoadAthletesList = ({
  template = "default",
  tooltip = "Download all PDF",
  icon = "fas fa-file-download",
  id
}) => {
  //Initial State
  const { filteredAthletes } = useContext(AthletesContext);
  const [renderState, setRender] = useState(false);
  const renderHandler = () => {
    setRender(false);
  };

  //Template Handler
  const blobHandler = () => {
    if (!renderState) {
      let filename;
      const component = (
        <AthleteListPDF athletes={filteredAthletes} template={template} />
      );
      switch (template) {
        case "team":
          filename = "team-athlete-list";
          break;

        default:
          filename = "athlete-list";
          break;
      }

      BlobDocument(component, renderHandler, filename);
      setRender(true);
    }
  };

  if (filteredAthletes) {
    return (
      <button
        className="blue-custom-button"
        data-tip
        data-for={id}
        onClick={e => {
          e.preventDefault();
          blobHandler();
        }}
      >
        <ReactTooltip id={id} place="top" type="light" effect="float">
          <span className="krt-tooltip">{tooltip}</span>
        </ReactTooltip>
        <i className={icon}></i>
        {renderState ? `...` : ``}
      </button>
    );
  } else {
    return (
      <button
        className="blue-custom-button"
        onClick={e => {
          e.preventDefault();
        }}
      >
        <i className={icon}></i>...
      </button>
    );
  }
};

export const ListPDFViewer = ({ template = "default" }) => {
  const { filteredAthletes } = useContext(AthletesContext);

  if (filteredAthletes) {
    return (
      <PDFViewer style={{ width: "100%", height: "100vh" }}>
        <AthleteListPDF athletes={filteredAthletes} template={template} />
      </PDFViewer>
    );
  } else {
    return null;
  }
};

export default DownLoadAthletesList;
