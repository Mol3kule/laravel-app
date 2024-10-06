<?php

namespace App\Enums;

enum UserType: string
{
    case User = 'user';
    case Employer = 'employer';
    case Admin = 'admin';
}
