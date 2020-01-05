import React from "react";
import dayjs from "dayjs";
import {
  Table,
  Column,
  Cell,
  TruncatedFormat,
  SelectionModes,
  IRegion
} from "@blueprintjs/table";
import { flatten } from "lodash";
import { Intent, HotkeysTarget, Hotkeys, Hotkey } from "@blueprintjs/core";
import { Rule } from "@/actions/rule";
import "./UserRule.scss";
import { Action } from "redux";

export type UserRuleProps = {
  rule: Rule[];
  del: (patterns: string[]) => Action;
};

type UserRuleState = {
  selectedRegions: IRegion[];
};

class UserRule extends React.PureComponent<UserRuleProps> {
  state: UserRuleState = {
    selectedRegions: []
  };

  render() {
    const props = this.props;

    const patternRenderer = (rowIndex: number) => {
      const rule = props.rule[rowIndex];
      return (
        <Cell
          tooltip={rule.pattern}
          intent={
            rule.pattern.startsWith("@@") ? Intent.DANGER : Intent.SUCCESS
          }
        >
          {rule.pattern}
        </Cell>
      );
    };

    const modifyRenderer = (rowIndex: number) => {
      const rule = props.rule[rowIndex];
      const moment = dayjs(rule.timestamp);
      return (
        <Cell>
          <TruncatedFormat>
            {moment.format("YYYY-MM-DD HH:mm:ss")}
          </TruncatedFormat>
        </Cell>
      );
    };

    return (
      <div className="user-rule">
        <Table
          onSelection={selectedRegions => {
            this.setState({ selectedRegions });
          }}
          enableMultipleSelection
          enableFocusedCell
          enableGhostCells
          enableRowResizing={false}
          selectionModes={SelectionModes.ROWS_ONLY}
          numRows={props.rule.length}
          defaultColumnWidth={200}
        >
          <Column name="PATTERN" cellRenderer={patternRenderer} />
          <Column name="TIMESTAMP" cellRenderer={modifyRenderer} />
        </Table>
        <p className="desc">
          用户规则，遵循与
          <a className="link" href="https://adblockplus.org/" target="_blank">
            Adblockplus
          </a>
          一样的设定，阅读
          <a
            className="link"
            target="_blank"
            href="https://help.eyeo.com/en/adblockplus/how-to-write-filters"
          >
            《如何撰写用户规则》
          </a>
          了解更多
        </p>
      </div>
    );
  }

  renderHotkeys() {
    return (
      <Hotkeys>
        <Hotkey
          global={false}
          combo="del"
          label="Delete rule"
          onKeyDown={() => {
            const { state, props } = this;
            const selectedData = flatten(
              state.selectedRegions.map(reg => {
                if (!reg.rows) return props.rule;
                return props.rule.slice(reg.rows[0], reg.rows[1] + 1);
              })
            ).map(r => r.pattern);
            props.del(selectedData);
          }}
        />
      </Hotkeys>
    );
  }
}
export default HotkeysTarget(UserRule);
