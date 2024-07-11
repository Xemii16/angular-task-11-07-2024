import {Component, OnInit} from '@angular/core';
import {MatTabLink, MatTabNav, MatTabNavPanel} from "@angular/material/tabs";
import {MatButton, MatIconButton} from "@angular/material/button";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {Location, NgIf, NgOptimizedImage} from "@angular/common";
import {
    AbstractControl,
    FormControl, FormGroup,
    FormsModule,
    ReactiveFormsModule,
    ValidationErrors,
    Validator,
    Validators
} from "@angular/forms";
import {User} from "../../../service/user/users-response";
import {UserService} from "../../../service/user/user.service";
import {MatFormField, MatLabel, MatPrefix} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {
    MatAutocomplete,
    MatAutocompleteModule,
    MatAutocompleteTrigger,
    MatOption
} from "@angular/material/autocomplete";
import {ErrorMessageHandler} from "../../../utility/error-message.handler";
import {merge} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
    selector: 'app-request-approval',
    standalone: true,
    imports: [
        MatTabNav,
        MatTabLink,
        MatTabNavPanel,
        MatButton,
        RouterOutlet,
        MatIcon,
        MatIconButton,
        MatToolbar,
        NgOptimizedImage,
        FormsModule,
        ReactiveFormsModule,
        NgIf,
        MatFormField,
        MatInput,
        MatLabel,
        MatPrefix,
        MatAutocomplete,
        MatOption,
        MatAutocompleteTrigger,
        MatAutocompleteModule,
        MatInputModule
    ],
    templateUrl: './request-approval.component.html',
    styleUrl: './request-approval.component.scss'
})
export class RequestApprovalComponent implements OnInit {
    user?: User
    validator: Validator = new RoleValidator();
    options: string[] = ['Студент', 'Вчитель'];
    request: FormGroup = new FormGroup({
        email: new FormControl(''),
        firstName: new FormControl('', {
            validators: [Validators.required, Validators.minLength(3)],
            updateOn: 'blur'
        }),
        lastName: new FormControl('', {
            validators: [Validators.required,  Validators.minLength(3)],
            updateOn: 'blur'
        }),
        role: new FormControl('', {
            validators: [this.validator.validate.bind(this.validator)],
            updateOn: 'blur'
        })
    });
    errorHandlers: RequestApprovalErrorHandlers = {
        firstName: new ErrorMessageHandler('Введіть ім\'я', '', "Ім'я має мати більше більше ніж 1 символ"),
        lastName: new ErrorMessageHandler('Введіть прізвище', '', "Прізвище має мати більше більше ніж 1 символ"),
    };

    constructor(private route: ActivatedRoute, private location: Location, private userService: UserService) {
        const {firstName, lastName, role} = this.request.controls;
        merge(firstName.valueChanges, firstName.updateOn)
            .pipe(takeUntilDestroyed())
            .subscribe(() => this.errorHandlers.firstName.updateErrorMessage(firstName));
        merge(lastName.valueChanges, lastName.updateOn)
            .pipe(takeUntilDestroyed())
            .subscribe(() => this.errorHandlers.lastName.updateErrorMessage(lastName));
    }

    returnBackPage() {
        this.location.back();
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id === null) return;
        this.userService.getUserById(id).then(user => {
            if (user === null) return;
            this.user = user;
            const {role, email, firstName, lastName} = this.request.controls;
            role.setValue(this.user?.role === 'TEACHER' ? 'Вчитель' : 'Студент');
            email.setValue(this.user?.email);
            firstName.setValue(this.user?.firstName);
            lastName.setValue(this.user?.lastName);
        });
    }

    onSubmit() {
        if (this.request.invalid) {
            this.request.markAllAsTouched();
            return;
        }
        const {firstName, lastName, role, email} = this.request.controls;
        const userId: string | null = this.route.snapshot.paramMap.get('id');
        if (userId === null) return;
        this.userService.enableUser({
            id: userId,
            firstName: firstName.value,
            lastName: lastName.value,
            role: role.value === 'Вчитель' ? 'TEACHER' : 'STUDENT'
        }).then(() => {
            this.location.back();
        });
    }
}

interface RequestApprovalErrorHandlers {
    firstName: ErrorMessageHandler;
    lastName: ErrorMessageHandler;
}

export class RoleValidator implements Validator {

    validate(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        if (value === "Вчитель" || value === "Студент") {
            return null;
        }
        return {invalidRole: true};
    }


}
