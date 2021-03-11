export const ActivityModels = {
    'POST': 'POST',
    'ANSWER': 'ANSWER',
};

export const ActivityActions = {
    'ANSWERED': 'ANSWERED',
    'CREATED': 'CREATED',
    'COMMENTED': 'COMMENTED',
    'SELECTED_ANSWER': 'SELECTED_ANSWER'
};

export const getActivityDescription = (activity) => {
    if (!activity) {
        return '';
    }
    switch(activity.model) {
        case ActivityModels.POST:
            if (activity.action === ActivityActions.CREATED) {
                return 'Created a question';
            }
            else if (activity.action === ActivityActions.ANSWERED) {
                return 'Answered a question';
            }
            else if (activity.action === ActivityActions.SELECTED_ANSWER) {
                return 'Marked as solved';
            }
            break;
        case ActivityModels.ANSWER:
            if (activity.action === ActivityActions.CREATED) {
                return 'Answered a question';
            }
            break;
        default:
            return '';
    }
}