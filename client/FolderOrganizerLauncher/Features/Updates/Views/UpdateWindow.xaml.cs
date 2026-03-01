using System;
using System.Windows;
using FolderOrganizerLauncher.Features.Updates.ViewModels;

namespace FolderOrganizerLauncher.Features.Updates.Views
{
    public partial class UpdateWindow : Window
    {
        public UpdateWindow(UpdateViewModel viewModel)
        {
            InitializeComponent();
            DataContext = viewModel;
            
            viewModel.RequestClose += (s, e) => this.Close();
        }
    }
}
