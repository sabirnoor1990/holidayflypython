"""
Django settings for holidayflypython project.

Generated by 'django-admin startproject' using Django 3.2.7.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

from pathlib import Path
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-e#1iq+xoxppi8t$6=k29kofh^7!y0@9jx-7k#_rnqs5%y7#-9m'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

#ALLOWED_HOSTS = []
# Allow all host headers
ALLOWED_HOSTS = ['*']

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'holidayflyapp'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'holidayflypython.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'holidayflypython.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'OPTIONS': {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
        },
        'NAME': 'holidayfly',  # databse name
        'USER': 'root',
        'PASSWORD': '',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR,'staticfiles')
# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


# constant defined by md sabir 01-10-2021
FLIGHTCLASSES = {
    'Economy': 'Economy',
    'Premium Economy': 'Premium Economy',
    'Business': 'Business',
    'First': 'First',
}
isProductionEnabled = False
apiurl = 'http://localhost' # Local
#apiurl = 'http://localhost' # Live
if isProductionEnabled:
    APIURL = {
        'APIKEY': '71003292899e6c83-b2a9-4a3a-a668-931a4eb4a3d6',
        'TRIPJACK_FL_SEARCHALL_URL': 'https://api.tripjack.com/fms/v1/air-search-all',
        'TRIPJACK_FL_API_FARE_RULE_URL': 'https://api.tripjack.com/fms/v1/farerule',
        'TRIPJACK_FL_API_REVIEW_URL': 'https://api.tripjack.com/fms/v1/review',
        'TRIPJACK_FL_API_INSTANT_BOOK_URL': 'https://api.tripjack.com/oms/v1/air/book',
        'TRIPJACK_FL_API_BOOKINGDETAILS_URL': 'https://api.tripjack.com/oms/v1/booking-details',
        'TRIPJACK_FL_API_GETAMENDMENTCHARGES_URL': 'https://api.tripjack.com/oms/v1/air/amendment/amendment-charges',
        'TRIPJACK_FL_API_SUBMITAMENDMENT_URL': 'https://api.tripjack.com/oms/v1/air/amendment/submit-amendment',
        'TRIPJACK_FL_API_AMENDMENTDETAILS_URL': 'https://api.tripjack.com/oms/v1/air/amendment/amendment-details',
        'TRIPJACK_FL_API_FAREVALIDATE_URL': 'https://api.tripjack.com/oms/v1/air/fare-validate',
        'TRIPJACK_FL_API_SEAT_URL': 'https://api.tripjack.com/fms/v1/seat',
    }
else:
    APIURL = {
        'APIKEY': '311588105d9884-721f-46d8-9e83-b7a77119c824',
        'TRIPJACK_FL_SEARCHALL_URL': apiurl+'/restapi/api/search',
        #'TRIPJACK_FL_SEARCHALL_URL': 'https://apitest.tripjack.com/fms/v1/air-search-all',
        'TRIPJACK_FL_API_FARE_RULE_URL': apiurl+'/restapi/api/farerule',
        'TRIPJACK_FL_API_REVIEW_URL': 'https://apitest.tripjack.com/fms/v1/review',
        'TRIPJACK_FL_API_INSTANT_BOOK_URL': 'https://apitest.tripjack.com/oms/v1/air/book',
        'TRIPJACK_FL_API_BOOKINGDETAILS_URL': 'https://apitest.tripjack.com/oms/v1/booking-details',
        'TRIPJACK_FL_API_CONFIRMFAREBEFORETICKETING_URL': 'https://apitest.tripjack.com/oms/v1/air/fare-validate',
        'TRIPJACK_FL_API_GETAMENDMENTCHARGES_URL': 'https://apitest.tripjack.com/oms/v1/air/amendment/amendment-charges',
        'TRIPJACK_FL_API_SUBMITAMENDMENT_URL': 'https://apitest.tripjack.com/oms/v1/air/amendment/submit-amendment',
        'TRIPJACK_FL_API_AMENDMENTDETAILS_URL': 'https://apitest.tripjack.com/oms/v1/air/amendment/amendment-details',
        'TRIPJACK_FL_API_FAREVALIDATE_URL': 'https://apitest.tripjack.com/oms/v1/air/fare-validate',
        'TRIPJACK_FL_API_SEAT_URL': 'https://apitest.tripjack.com/fms/v1/seat',
    }
