from django import template

import os

register = template.Library()

@register.filter
def CompileAddress(address_id):
    return("blablabla")