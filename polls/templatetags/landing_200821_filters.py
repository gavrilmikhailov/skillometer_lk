from django import template

import os

register = template.Library()

@register.filter
def CompileAddress(address_id):
    return("blablabla")


@register.filter
def GetRating(quest_id):
    return(0)

@register.filter
def GetPayment(quest_id):
    return(0)