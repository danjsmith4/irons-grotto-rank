import { Label } from '@/app/rank-calculator/components/label';
import { Box, ScrollArea, Spinner, Text } from '@radix-ui/themes';
import * as Ariakit from '@ariakit/react';
import { startTransition, useCallback, useMemo } from 'react';
import { useFormContext, useFormState, useWatch } from 'react-hook-form';
import { Input } from '@/app/rank-calculator/components/input';
import { PersonIcon } from '@radix-ui/react-icons';
import { search } from 'fast-fuzzy';
import { ErrorMessage } from '@hookform/error-message';
import { debounce } from 'lodash';
import { fetchPlayerJoinDate } from '@/app/rank-calculator/data-sources/fetch-player-join-date';

interface PlayerNameInputProps {
  members: string[];
}

export function PlayerNameInput({ members }: PlayerNameInputProps) {
  const { setValue, register } = useFormContext();
  const { errors, validatingFields } = useFormState();
  const playerNameValue = useWatch({ name: 'playerName' });

  const matches = useMemo(
    () => (playerNameValue ? search(playerNameValue, members) : members),
    [playerNameValue, members],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchAndSetJoinDate = useCallback(
    debounce(async (playerName: string) => {
      const joinDate = await fetchPlayerJoinDate(playerName);

      if (joinDate) {
        setValue('joinDate', joinDate);
      }
    }, 600),
    [],
  );

  return (
    <>
      <Ariakit.ComboboxProvider
        setValue={(value) => {
          startTransition(() => {
            setValue('playerName', value);
            fetchAndSetJoinDate(value);
          });
        }}
      >
        <Label weight="bold">
          <Text as="p" mb="2">
            Player name
          </Text>
          <Ariakit.Combobox
            showOnClick
            autoComplete="both"
            render={({ color, defaultValue, ...props }) => (
              <Input
                hasError={!!errors.playerName}
                size="3"
                placeholder="Enter your RSN"
                required
                id="playerName"
                leftIcon={<PersonIcon />}
                rightIcon={
                  validatingFields.playerName ? <Spinner /> : undefined
                }
                {...register('playerName', {
                  onChange: fetchAndSetJoinDate,
                })}
                {...props}
              />
            )}
          />
          <Ariakit.ComboboxPopover
            getAnchorRect={(anchor) =>
              anchor?.parentElement?.getBoundingClientRect() ?? null
            }
            portal
            portalElement={
              typeof document !== 'undefined'
                ? document.getElementById('theme-root')
                : null
            }
            gutter={8}
            sameWidth
            className="rt-PopoverContent rt-SelectContent rt-r-size-1 popover"
            render={({ dir, children, ...props }) => (
              <ScrollArea {...props}>
                <Box>{children}</Box>
              </ScrollArea>
            )}
          >
            {matches.length === 0 && playerNameValue && (
              <Box p="2">
                <Text size="2">No matches found</Text>
              </Box>
            )}
            {matches.map((value) => (
              <Ariakit.ComboboxItem
                key={value}
                value={value}
                className="combobox-item"
                render={({ color, ...props }) => <Text {...props} size="2" />}
              />
            ))}
          </Ariakit.ComboboxPopover>
        </Label>
      </Ariakit.ComboboxProvider>
      <ErrorMessage
        errors={errors}
        name="playerName"
        render={({ message }) => (
          <Text as="p" color="red">
            {message}
          </Text>
        )}
      />
    </>
  );
}
