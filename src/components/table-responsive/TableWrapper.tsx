import styled from "styled-components";
import { isValidProp } from "@utils/utils";

interface TableResponsiveProps {
  headers?: string[];
  colorGreen: string;
  colorBlue?: string;
  children?: any;
  headerBg?: string;
}

const TableWrapper = ({
  headers,
  children,
  colorBlue,
  colorGreen,

  headerBg,
}: TableResponsiveProps) => {
  const WrapperResposiveTable = styled.div.withConfig({
    shouldForwardProp: (prop) => isValidProp(prop),
  })`
    font-family: "Helvetica Neue", Helvetica, Arial;
    font-size: 16px;
    line-height: 20px;
    font-weight: 400;
    color: #3b3b3b;
    -webkit-font-smoothing: antialiased;
    font-smoothing: antialiased;
    backgroundcolor: inherit;

    @media screen and (max-width: 580px) {
      body {
        font-size: 16px;
        line-height: 22px;
      }
    }

    .wrapper {
      margin: 0 auto;
      padding: 40px;
      max-width: 800px;
    }

    .table {
      margin: 0 0 40px 0;
      width: 100%;
   #   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      display: table;
    }
    @media screen and (max-width: 580px) {
      .table {
        display: block;
      }
    }

    .row {
      display: table-row;
      background:  ${colorGreen ? colorGreen : "#f6f6f6"};

    }
    .row:nth-of-type(odd) {
      background:  ${colorBlue ? colorBlue : "#e9e9e9"};
    }
    .row.header {
      font-weight: 900;
      color: #ffffff;
      background: ${headerBg};
    }
    .row.green {
      background: ${colorGreen ? colorGreen : "#27ae60"};
    }
    .row.blue {
      background: ${colorBlue ? colorBlue : "#2980b9"};
    }
    @media screen and (max-width: 580px) {
      .row {
        padding: 14px 0 7px;
        display: block;
        margin-top: 1rem;
        box-shadow: 0 1px 3px rgba(0,0,0,0.2)
      }
      .row.header {
        padding: 0;
        height: 6px;
      }
      .row.header .cell {
        display: none;
      }
      .row .cell {
        margin-bottom: 10px;
      }
      .row .cell:before {
        margin-bottom: 3px;
        content: attr(data-title);
        min-width: 98px;
        font-size: 12px;
        line-height: 12px;
        font-weight: bold;
        text-transform: uppercase;
        color: #969696;
        display: block;
      }
    }

    .cell {
      padding: 6px 12px;
      display: table-cell;
    }
    @media screen and (max-width: 580px) {
      .cell {
        padding: 2px 16px;
        display: block;
      }
    }
  `;

  return (
    <WrapperResposiveTable>
      <div className="table">
        <div className="row header">
          {headers &&
            headers.length > 0 &&
            headers.map((title, idx) => (
              <div key={idx} className="cell">
                {title}
              </div>
            ))}
        </div>
        {children}
      </div>
    </WrapperResposiveTable>
  );
};

export default TableWrapper;
