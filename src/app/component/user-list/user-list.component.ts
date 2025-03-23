import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;

  constructor(private userService: UserService,private toastr:ToastrService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  editUser(user: User): void {
    this.selectedUser = { ...user };
  }

  updateUser(): void {
    if (this.selectedUser && this.selectedUser.id) {
      this.userService.updateUser(this.selectedUser).subscribe(() => {
        this.selectedUser = null;
        this.loadUsers();
      });
    }
  }

  cancelEdit(): void {
    this.selectedUser = null;
  }

  deleteUser(userId: string,user:any): void {
    this.userService.deleteUser(userId,user).subscribe(() => {
      this.toastr.success('User deleted successfully!');
      this.loadUsers();
    })
  }
}
