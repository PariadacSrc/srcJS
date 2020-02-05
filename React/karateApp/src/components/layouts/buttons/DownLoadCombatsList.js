import React, { useContext, useState } from "react";
import {
  pdf,
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  Image,
  Font,
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
import { CombatsContext } from "../../actionscontext/CombatsContext";

Font.register({
  family: "RobotoBold",
  src: `${process.env.PUBLIC_URL}/assets/fonts/roboto/Roboto-Bold.ttf`
});

Font.register({
  family: "Roboto",
  src: `${process.env.PUBLIC_URL}/assets/fonts/roboto/Roboto-Regular.ttf`
});

const mainPDFStyles = StyleSheet.create({
  body: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingHorizontal: "5%"
  },
  logo: {
    marginVertical: 30,
    width: "30%"
  },
  categorycontent: {
    padding: 10,
    width: "50%",
    textAlign: "right"
  },
  eventcontent: {
    padding: 10,
    width: "50%",
    textAlign: "left"
  },
  headertitle: {
    position: "absolute",
    right: 5,
    top: 30,
    width: "40%",
    textAlign: "right",
    fontFamily: "Roboto"
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "stretch"
  },
  tableheader: {
    fontSize: "10pt",
    border: "0px",
    textAlign: "center",
    paddingBottom: 15,
    fontFamily: "Roboto"
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
    paddingBottom: 3,
    textAlign: "center",
    fontFamily: "Roboto"
  },
  totaltitle: {
    fontSize: "12pt",
    marginBottom: 5,
    marginTop: 15,
    fontFamily: "Roboto"
  },
  totalsbody: {
    fontSize: "8pt",
    fontFamily: "Roboto"
  },
  topheadertable: {
    width: "60%",
    position: "absolute",
    marginTop: 15,
    right: "5%"
  },
  sideborders: {
    borderRightWidth: 1,
    borderRightStyle: "solid",
    borderRightColor: "#000"
  },
  fullborders: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "#000",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "#000",
    borderRightWidth: 1,
    borderRightStyle: "solid",
    borderRightColor: "#000",
    borderLeftWidth: 1,
    borderLeftStyle: "solid",
    borderLeftColor: "#000",
    width: "90%",
    height: 12,
    marginLeft: "5%"
  }
});

const noMargin = {
  includeLeftBorder: false,
  includeRightBorder: false,
  includeTopBorder: false,
  includeBottomBorder: false
};

const athleteCubit = value => {
  return (
    <View style={mainPDFStyles.fullborders}>
      <Text>{`${value}`}</Text>
    </View>
  );
};

const athleteName = name => {
  const values = name ? name.split("-") : ["--", "--"];
  return (
    <View>
      <Text style={{ fontFamily: "RobotoBold" }}>{`${values[0].trim()}`}</Text>
      <Text>{`${values[1].trim()}`}</Text>
    </View>
  );
};

const combatPDFTemplate = (list, page, category, eventype, block) => {
  let recorcount = 0;
  return (
    <Page orientation="landscape" size="A4" style={mainPDFStyles.body}>
      <View>
        <Image
          src={`${process.env.PUBLIC_URL}/assets/img/resource/logo-dark.png`}
          style={mainPDFStyles.logo}
        ></Image>
      </View>
      <View style={mainPDFStyles.topheadertable}>
        <Table data={[{ content: "Name" }, { content: "Dojo" }]}>
          <TableHeader textAlign={"center"}>
            <TableCell
              styles={{
                ...mainPDFStyles.tableheader,
                ...mainPDFStyles.sideborders
              }}
            ></TableCell>
            <TableCell
              styles={{
                ...mainPDFStyles.tableheader,
                ...mainPDFStyles.sideborders
              }}
            >
              1st Place
            </TableCell>
            <TableCell
              styles={{
                ...mainPDFStyles.tableheader,
                ...mainPDFStyles.sideborders
              }}
            >
              2st Place
            </TableCell>
            <TableCell
              styles={{
                ...mainPDFStyles.tableheader,
                ...mainPDFStyles.sideborders
              }}
            >
              3st Place
            </TableCell>
            <TableCell
              styles={{
                ...mainPDFStyles.tableheader
              }}
            >
              4st Place
            </TableCell>
          </TableHeader>
          <TableBody>
            <DataTableCell
              styles={{
                ...mainPDFStyles.tablebody,
                ...mainPDFStyles.sideborders
              }}
              getContent={r => r.content}
            />
            <DataTableCell
              styles={{
                ...mainPDFStyles.tablebody,
                ...mainPDFStyles.sideborders
              }}
              getContent={r => ""}
            />
            <DataTableCell
              styles={{
                ...mainPDFStyles.tablebody,
                ...mainPDFStyles.sideborders
              }}
              getContent={r => ""}
            />
            <DataTableCell
              styles={{
                ...mainPDFStyles.tablebody,
                ...mainPDFStyles.sideborders
              }}
              getContent={r => ""}
            />
            <DataTableCell
              styles={{
                ...mainPDFStyles.tablebody
              }}
              getContent={r => ""}
            />
          </TableBody>
        </Table>
      </View>

      <View style={{ marginHorizontal: "30%", marginBottom: 30 }}>
        <Table data={[{ category: category, event: eventype, block: block }]}>
          <TableHeader textAlign={"center"} {...noMargin}>
            <TableCell
              styles={{
                ...mainPDFStyles.tableheader
              }}
            >
              Category
            </TableCell>
            <TableCell
              styles={{
                ...mainPDFStyles.tableheader
              }}
            >
              Event Type
            </TableCell>
            <TableCell
              styles={{
                ...mainPDFStyles.tableheader
              }}
            >
              Block
            </TableCell>
          </TableHeader>
          <TableBody {...noMargin} includeBottomBorder={true}>
            <DataTableCell
              styles={{
                ...mainPDFStyles.tablebody
              }}
              getContent={r => r.category}
            />
            <DataTableCell
              styles={{
                ...mainPDFStyles.tablebody
              }}
              getContent={r => r.event}
            />
            <DataTableCell
              styles={{
                ...mainPDFStyles.tablebody
              }}
              getContent={r => `${r.block}`}
            />
          </TableBody>
        </Table>
      </View>
      <View style={{ ...mainPDFStyles.container, marginHorizontal: "2%" }}>
        <Table data={list}>
          <TableHeader textAlign={"center"} {...noMargin}>
            <TableCell
              styles={{
                ...mainPDFStyles.tableheader,
                ...mainPDFStyles.tablesmall
              }}
            ></TableCell>
            <TableCell
              styles={{
                ...mainPDFStyles.tableheader,
                minWidth: "14%"
              }}
            >
              Athlete 1
            </TableCell>
            <TableCell
              styles={{
                ...mainPDFStyles.tableheader,
                ...mainPDFStyles.tablesmall
              }}
            >
              vs
            </TableCell>
            <TableCell
              styles={{
                ...mainPDFStyles.tableheader,
                minWidth: "14%"
              }}
            >
              Athlete 2
            </TableCell>

            <TableCell
              styles={{
                ...mainPDFStyles.tableheader,
                minWidth: "12%"
              }}
            >
              Winner Rnd1
            </TableCell>
            <TableCell
              styles={{
                ...mainPDFStyles.tableheader,
                minWidth: "12%"
              }}
            >
              Winner Rnd2
            </TableCell>
            <TableCell
              styles={{
                ...mainPDFStyles.tableheader,
                minWidth: "12%"
              }}
            >
              Winner Rnd3
            </TableCell>
            <TableCell
              styles={{
                ...mainPDFStyles.tableheader,
                minWidth: "12%"
              }}
            >
              Winner Rnd4
            </TableCell>
          </TableHeader>
          <TableBody {...noMargin}>
            <DataTableCell
              styles={{
                ...mainPDFStyles.tablebody,
                ...mainPDFStyles.tablesmall
              }}
              getContent={r => {
                if (!r.round) {
                  recorcount++;
                  return `${recorcount}`;
                } else {
                  return "";
                }
              }}
            />
            <DataTableCell
              styles={{
                ...mainPDFStyles.tablebody,
                textAlign: "left",
                minWidth: "14%"
              }}
              getContent={r => {
                if (!r.round) {
                  return athleteName(r.person_one);
                } else {
                  return "";
                }
              }}
            />
            <DataTableCell
              styles={{
                ...mainPDFStyles.tablebody,
                ...mainPDFStyles.tablesmall
              }}
              getContent={r => " "}
            />
            <DataTableCell
              styles={{
                ...mainPDFStyles.tablebody,
                textAlign: "left",
                minWidth: "14%"
              }}
              getContent={r => {
                if (!r.round) {
                  return athleteName(r.person_two);
                } else {
                  return "";
                }
              }}
            />
            <DataTableCell
              styles={{
                ...mainPDFStyles.tablebody,
                minWidth: "12%"
              }}
              getContent={r => {
                if (!r.round) {
                  return athleteCubit("");
                } else {
                  return "";
                }
              }}
            />
            <DataTableCell
              styles={{
                ...mainPDFStyles.tablebody,
                minWidth: "12%"
              }}
              getContent={r => {
                if (r.round) {
                  return r.round === 1 ? athleteCubit("") : "";
                } else {
                  return "";
                }
              }}
            />
            <DataTableCell
              styles={{
                ...mainPDFStyles.tablebody,
                minWidth: "12%"
              }}
              getContent={r => {
                if (r.round) {
                  return r.round === 2 ? athleteCubit("") : "";
                } else {
                  return "";
                }
              }}
            />
            <DataTableCell
              styles={{
                ...mainPDFStyles.tablebody,
                minWidth: "12%"
              }}
              getContent={r => {
                if (r.round) {
                  return r.round === 3 ? athleteCubit("") : "";
                } else {
                  return "";
                }
              }}
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

const getCategoryArray = list => {
  const categories = {};

  list.map(combat => {
    if (categories[combat.category]) {
      categories[combat.category].push(combat);
    } else {
      categories[combat.category] = [combat];
    }
  });

  return categories;
};

export const CombatsListPDF = ({ combats, template }) => {
  const combatsChunks = (combats, page = 0, category, event) => {
    try {
      const limit = combats.length;
      const size = 8;
      const chunks = Math.ceil(limit / size);
      let list = new Array(chunks);

      for (let i = 0; i < list.length; i++) {
        let start = i * size;
        let end = start + size > limit ? limit : start + size;

        const tournamentList = internalCombats(combats.slice(start, end));
        page++;
        list[i] = combatPDFTemplate(
          tournamentList,
          page,
          category,
          event,
          i + 1
        );
      }

      return list;
    } catch (error) {
      return <Page orientation="landscape" wrap size="A4"></Page>;
    }
  };

  const evaluatePotency = (base, element, nearby = false, exponent = 1) => {
    try {
      let potency = 1;
      const limit = 10;

      if (exponent <= limit) {
        for (let potenindex = 0; potenindex < exponent; potenindex++) {
          potency = potency * base;
        }
        let returnData = {
          potency: potency > element ? potency / base : potency,
          exponent: nearby ? (potency > element ? exponent - 1 : exponent) : 0
        };

        if (potency < element) {
          return evaluatePotency(base, element, nearby, exponent + 1);
        } else {
          return returnData;
        }
      } else {
        return 0;
      }
    } catch (error) {
      return 0;
    }
  };

  const internalCombats = (list, loop = 0) => {
    try {
      if (list.length >= 2) {
        const { potency, exponent } = evaluatePotency(2, list.length, true);

        const chunksHalf = potency === list.length ? potency / 2 : potency;

        const lowerhalf = list.slice(0, chunksHalf);
        const upperhalf = list.slice(chunksHalf);

        const lowerCombat = internalCombats(lowerhalf, loop + 1);
        const upperCombat = internalCombats(upperhalf, loop + 1);

        return lowerCombat.concat(
          loop === 0 && lowerhalf.length !== upperhalf.length
            ? [{ round: exponent + 1 }].concat(
                [{ round: exponent }].concat(upperCombat)
              )
            : [{ round: exponent }].concat(upperCombat)
        );
      } else {
        return list;
      }
    } catch (error) {
      return list;
    }
  };

  let pages = 0;
  const filterTemplate = template => {
    switch (template) {
      case "category":
        const categories = Object.entries(getCategoryArray(combats));
        return categories.map(category => {
          const pdflist = combatsChunks(
            category[1],
            pages,
            category[0],
            category[1][0].competition_type
          );
          pages = pages + pdflist.length;
          return pdflist;
        });

      default:
        const pdflist = combatsChunks(combats, 0, ``);
        pages = pdflist.length;
        return pdflist;
    }
  };

  return <Document>{filterTemplate(template)}</Document>;
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

export const DownLoadCombatsList = ({
  template = "default",
  tooltip = "Download all PDF",
  icon = "fas fa-file-download",
  id
}) => {
  //Initial State
  const { filteredCombats } = useContext(CombatsContext);
  const [renderState, setRender] = useState(false);
  const renderHandler = () => {
    setRender(false);
  };

  //Template Handler
  const blobHandler = () => {
    if (!renderState) {
      let filename;
      const component = (
        <CombatsListPDF combats={filteredCombats} template={template} />
      );
      switch (template) {
        case "category":
          filename = "category-combat-list";
          break;

        default:
          filename = "combat-list";
          break;
      }

      BlobDocument(component, renderHandler, filename);
      setRender(true);
    }
  };

  if (filteredCombats) {
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
  const { filteredCombats } = useContext(CombatsContext);

  if (filteredCombats) {
    return (
      <PDFViewer style={{ width: "100%", height: "100vh" }}>
        <CombatsListPDF combats={filteredCombats} template={template} />
      </PDFViewer>
    );
  } else {
    return null;
  }
};

export default DownLoadCombatsList;
