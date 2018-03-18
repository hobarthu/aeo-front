import React from 'react'
import { Tooltip, Button } from 'antd'

const AeoButton = (props) => {
    if (props.btnObj.disable) {
        return (
        <Tooltip title={props.btnObj.tooltip}>
            <Button className={props.btnObj.btnClassName} disabled>{props.btnObj.name}</Button>          
        </Tooltip>
        );
    } else {
        if (props.btnObj.clickFunParams) {
            return (
                <Button className={props.btnObj.btnClassName} onClick={() => {console.log("aa", props.btnObj.clickFunParams); props.btnObj.clickFunParams && props.clickFun(props.btnObj.clickFunParams)}}>{props.btnObj.name}</Button>
            )
        } else {
            return (
                <Button className={props.btnObj.btnClassName} onClick={props.clickFun}>{props.btnObj.name}</Button>
            )
        }
    }
};

export {
    AeoButton
}
