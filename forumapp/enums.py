from enum import Enum

class ActivityTypeEnum(Enum):
    POST='POST'
    ANSWER='ANSWER'

    @classmethod
    def choices(cls):
        return tuple((i.name, i.value) for i in cls)

class ActivityActionEnum(Enum):
    ANSWERED='ANSWERED'
    CREATED='CREATED'
    COMMENTED='COMMENTED'
    SELECTED_ANSWER='SELECTED_ANSWER'

    @classmethod
    def choices(cls):
        return tuple((i.name, i.value) for i in cls)