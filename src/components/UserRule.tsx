import React from "react";
import dayjs from "dayjs";
import {
  Table,
  Column,
  Cell,
  TruncatedFormat,
  IMenuContext,
  SelectionModes,
  RegionCardinality
} from "@blueprintjs/table";
import { Intent, Menu, MenuItem, MenuDivider } from "@blueprintjs/core";
import { flatten } from "lodash";
import { Rule } from "@/actions/rule";
import RuleInput from "@/containers/RuleInput";
import "./UserRule.scss";

export type UserRulrsProps = {
  rule: Rule[];
};

const UserRulrs = (props: UserRulrsProps) => {
  const patternRenderer = (rowIndex: number) => {
    const rule = props.rule[rowIndex];
    return (
      <Cell
        tooltip={rule.pattern}
        intent={rule.pattern.startsWith("@@") ? Intent.DANGER : Intent.SUCCESS}
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

  const renderBodyContextMenu = (context: IMenuContext) => {
    const selectedData = flatten(
      context.getSelectedRegions().map(reg => {
        if (!reg.rows) return props.rule;
        return props.rule.slice(reg.rows[0], reg.rows[1] + 1);
      })
    );
    return (
      <Menu>
        {selectedData.length === 1 && (
          <>
            {selectedData[0].pattern.startsWith("@@") ? (
              <MenuItem icon="walk" text="添加到代理" intent={Intent.PRIMARY} />
            ) : (
              <MenuItem
                icon="disable"
                text="添加白名单"
                intent={Intent.PRIMARY}
              />
            )}

            <MenuDivider />
          </>
        )}
        <MenuItem icon="delete" intent={Intent.DANGER} text="删除" />
      </Menu>
    );
  };

  return (
    <div className="user-rule">
      <Table
        bodyContextMenuRenderer={renderBodyContextMenu}
        enableMultipleSelection
        enableFocusedCell
        enableGhostCells
        enableRowResizing={false}
        selectionModes={SelectionModes.ROWS_ONLY}
        numRows={props.rule.length}
        defaultColumnWidth={200}
      >
        <Column name="Pattern" cellRenderer={patternRenderer} />
        <Column name="Timestamp" cellRenderer={modifyRenderer} />
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
      <RuleInput />
    </div>
  );
};

export default UserRulrs;
