{
  'target_defaults': {
    'conditions': [
      ['OS=="win"', {
        'msvs_disabled_warnings': [
          4530,  # C++ exception handler used, but unwind semantics are not enabled
          4506   # no definition for inline function
        ]
      }]
    ]
  },
  'targets': [
    {
      'target_name': 'adal-bridge',
      'include_dirs': [
        '<!(node -e "require(\'nan\')")'
      ],
      'sources': [
        'src/main.cc'
      ],
      'conditions': [
        ['OS=="mac"', {
          'xcode_settings': {
            'SDKROOT': 'macosx10.12',
            'OTHER_CPLUSPLUSFLAGS': ['-std=c++11', '-stdlib=libc++'],
            'OTHER_LDFLAGS': ['-stdlib=libc++']
          },
          'mac_framework_dirs': [
            '<(module_root_dir)/vendor',
            '$(SDKROOT)/System/Library/Frameworks'
          ],
          'libraries': [
            '-Wl,-rpath,<(module_root_dir)/vendor'
          ],
          'sources': [
            'src/adal_bridge_mac.mm'
          ],
          'link_settings': {
            'libraries': [
              'Foundation.framework',
              'AppKit.framework',
              'ADAL.framework'
            ]
          }
        }],
        ['OS=="win"', {
          'sources': [
            'src/adal_bridge_win.cc'
          ]
        }],
        ['OS=="linux"', {
          'sources': [
            'src/adal_bridge_linux.cc'
          ]
        }]
      ]
    }
  ]
}
