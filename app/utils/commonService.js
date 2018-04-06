import {
    options,
    treeData,
} from 'containers/project-form'
import * as _ from 'lodash'

export const ProjectService = {
    getCompanyCategory: (project) => {
        let list = project.companyCategory && project.companyCategory.split(',') || [];
        let displayList = []; 
        _.map(options, (item) => {
            if (list.indexOf(item.value) != -1) {
                displayList = displayList.concat([item.label]);
            }
        });
        return !_.isEmpty(displayList) && displayList.join(', ') || '';
    },
    getAeoCategory: (project) => {
        var displayStr = '';
        if (project.aeoCategory == 'kehu') {
          displayStr = '客户委托';
        } else if (project.aeoCategory == 'haiguan') {
          displayStr = '海关委托';
        }
        return displayStr;
    },
    getCreditRating: (project) => {
        let displayList = [];
        let node = _.find(treeData, {value: project.certificateType});
        if (node) {
            displayList = displayList.concat([node.label]);
            let child = _.find(node.children, {value: project.certificateTypeCategory});
            child && (displayList = displayList.concat([child.label]));
        }
        return !_.isEmpty(displayList) && displayList.join(', ') || '';
    }
}